import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Panel from "./Panel";
import Beacon from "./Beacon";
import VoiceRecorder from "./VoiceRecorder";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.alert};
  text-shadow: ${({ theme }) => theme.shadows.softGlow};
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  gap: 10px;  // Space between beacons and text
`;

const VoiceRecorderContainer = styled.div`
  margin-top: 20px;
  text-align: center;

  button {
    padding: 10px 20px;
    margin: 10px 0;
    font-size: 1rem;
    color: #fff;
    background-color: #1e3a8a;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff073a;  // Change color on hover
    }
  }

  a {
    display: block;
    margin-top: 10px;
    color: #39ff14;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;

    &:hover {
      color: #ffff00;  // Yellow on hover for download link
    }
  }
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Title>
        <Beacon sync="primary" /> Emergency Medical Hologram <Beacon sync="secondary" />
      </Title>
      <Panel>
        <p>Providing advanced ENT care with real-time emergency responses.</p>
        <Button>Contact Now</Button>
      </Panel>
      <VoiceRecorderContainer>
        <h2>Record Your Voice</h2>
        <VoiceRecorder />
      </VoiceRecorderContainer>
    </HomePageContainer>
  );
}

export default HomePage;
