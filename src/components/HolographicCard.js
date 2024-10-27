import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 20px;
  background: rgba(30, 30, 70, 0.8);
  border: 2px solid #39ff14;
  border-radius: 10px;
  box-shadow: 0 0 15px #39ff14;
  margin: 20px 0;
  text-align: center;
  color: #39ff14;
  font-size: 1.1rem;
  animation: slideIn 1s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HolographicCard = ({ data }) => {
    return (
      <CardContainer>
        <h3>Transcription Data</h3>
        <p><strong>Name:</strong> {data?.Name || "N/A"}</p>
        <p><strong>Occupation:</strong> {data?.Occupation || "N/A"}</p>
        <p><strong>Summary:</strong> {data?.Summary || "No summary available"}</p>
      </CardContainer>
    );
  };
  
  export default HolographicCard;
  
