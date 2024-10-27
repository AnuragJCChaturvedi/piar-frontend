import styled, { keyframes } from "styled-components";

// Primary flashing animation
const primaryFlash = keyframes`
  0% { background-color: #ff073a; }       // Red
  33% { background-color: #ffffff; }      // White
  66% { background-color: #ffff00; }      // Yellow
  100% { background-color: #ff073a; }     // Red
`;

// Secondary flashing animation (slight delay for synchronization effect)
const secondaryFlash = keyframes`
  0% { background-color: #ffffff; }       // White
  33% { background-color: #ffff00; }      // Yellow
  66% { background-color: #ff073a; }      // Red
  100% { background-color: #ffffff; }     // White
`;

const Beacon = styled.div`
  width: 40px;
  height: 30px;
  clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%); // Trapezoidal shape
  animation: ${({ sync }) => (sync === 'primary' ? primaryFlash : secondaryFlash)} 1s infinite;
  box-shadow: 0px 0px 15px rgba(255, 7, 58, 0.8), 
              0px 0px 25px rgba(255, 255, 255, 0.8), 
              0px 0px 20px rgba(255, 255, 0, 0.8);
  margin: 10px;
`;

export default Beacon;
