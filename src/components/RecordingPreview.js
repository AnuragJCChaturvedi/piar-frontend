import React from "react";
import styled from "styled-components";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border: 2px solid #1e3a8a;
  padding: 20px;
  border-radius: 10px;
`;

const AudioPlayer = styled.audio`
  margin-top: 10px;
  width: 100%;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const ImageItem = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 2px solid #1e3a8a;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff073a;
  }
`;

const RecordingPreview = ({ audioURL, images, onCancel, onSubmit }) => {
  return (
    <PreviewContainer>
      <h3>Recording Preview</h3>
      <p>Audio Preview:</p>
      <AudioPlayer controls src={audioURL} />
      <p>Captured Images:</p>
      <ImageGallery>
        {images.map((image, index) => (
          <ImageItem key={index} src={image} alt={`Captured ${index + 1}`} />
        ))}
      </ImageGallery>
      <ButtonContainer>
        <ActionButton onClick={onCancel}>Cancel</ActionButton>
        <ActionButton onClick={onSubmit}>Submit for Transcribing</ActionButton>
      </ButtonContainer>
    </PreviewContainer>
  );
};

export default RecordingPreview;
