import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCircleStop, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import wavEncoder from "wav-encoder";
import Webcam from "react-webcam";
import RecordingPreview from "./RecordingPreview"; // Import the RecordingPreview component

const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerContainer = styled.div`
  font-size: 1.5rem;
  color: #1e3a8a;
  margin-top: 10px;
`;

const CircularControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #0a0c1d;
  border: 4px solid #1e3a8a;
  position: relative;
  margin: 20px 0;
`;

const IconButton = styled(FontAwesomeIcon)`
  color: #1e3a8a;
  font-size: 2.5rem;
  cursor: pointer;
  position: absolute;
  transition: color 0.3s ease;

  &:hover {
    color: #ff073a;
  }
`;

const StartIcon = styled(IconButton)`
  font-size: 3rem;
`;

const FlashEffect = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: ${({ flash }) => (flash ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.2s ease-in-out;
`;

const WebcamContainer = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  margin-top: 20px;
  border: 2px solid #1e3a8a;
`;

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null); // Store audio Blob
  const [audioURL, setAudioURL] = useState(null); // URL for audio playback
  const [images, setImages] = useState([]);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [flash, setFlash] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const webcamRef = useRef(null);
  const imageCaptureInterval = useRef(null);

  // Start audio and video recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlobWebM = new Blob(audioChunks.current, { type: "audio/webm" });
        const wavBlob = await downsampleAudio(audioBlobWebM, 16000); // Convert to 16kHz WAV
        setAudioBlob(wavBlob); // Save WAV Blob for backend
        setAudioURL(URL.createObjectURL(wavBlob)); // URL for playback
        audioChunks.current = [];
      };

      // Start timer for audio
      timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);

      // Start image capture every 10 seconds
      imageCaptureInterval.current = setInterval(captureImage, 10000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Capture webcam image with flash effect
  const captureImage = () => {
    if (webcamRef.current) {
      setFlash(true);
      const imageSrc = webcamRef.current.getScreenshot();
      setImages((prev) => [...prev, imageSrc]);
      setTimeout(() => setFlash(false), 200);
    }
  };

  // Pause or resume audio and video recording
  const togglePause = () => {
    if (isPaused) {
      mediaRecorderRef.current.resume();
      timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
      imageCaptureInterval.current = setInterval(captureImage, 10000);
    } else {
      mediaRecorderRef.current.pause();
      clearInterval(timerRef.current);
      clearInterval(imageCaptureInterval.current);
    }
    setIsPaused(!isPaused);
  };

  // Stop recording audio and video
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(timerRef.current);
    clearInterval(imageCaptureInterval.current);
    setTimer(0);
  };

  const handleCancel = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setImages([]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    for (let image of images) {
        const response = await fetch(image);
        const imageBlob = await response.blob();
        formData.append("images", imageBlob, "image.jpeg"); 
    }

    try {
        const response = await fetch("http://localhost:8000/transcribe", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error submitting data:", error);
    }
};



  // Downsample audio to 16 kHz WAV
  const downsampleAudio = async (audioBlob, targetSampleRate) => {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.duration * targetSampleRate,
      targetSampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const resampledBuffer = await offlineContext.startRendering();
    const wavData = await wavEncoder.encode({
      sampleRate: targetSampleRate,
      channelData: [resampledBuffer.getChannelData(0)],
    });

    return new Blob([wavData], { type: "audio/wav" });
  };

  // Format timer as mm:ss
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <RecorderContainer>
      {isRecording && <TimerContainer>{formatTime(timer)}</TimerContainer>}
      <CircularControls>
        {isRecording ? (
          <>
            <IconButton icon={isPaused ? faCirclePlay : faCirclePause} onClick={togglePause} />
            <IconButton icon={faCircleStop} onClick={stopRecording} />
          </>
        ) : (
          <StartIcon icon={faCirclePlay} onClick={startRecording} />
        )}
      </CircularControls>

      <WebcamContainer>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
        />
        <FlashEffect flash={flash} />
      </WebcamContainer>

      {audioURL && (
        <RecordingPreview
          audioURL={audioURL}
          images={images}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </RecorderContainer>
  );
};

export default VoiceRecorder;
