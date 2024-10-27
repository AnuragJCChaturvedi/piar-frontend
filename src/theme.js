import { createGlobalStyle, keyframes, css } from "styled-components";

// Beacon flashing animation for red and blue alternating colors
const beaconFlash = keyframes`
  0%, 100% { background-color: #ff073a; }   // Red
  50% { background-color: #00faff; }        // Blue
`;

// Color transition for background
const colorTransition = keyframes`
  0% { background-color: #0a0c1d; }
  50% { background-color: #1e3a8a; }
  100% { background-color: #0a0c1d; }
`;

export const theme = {
  colors: {
    background: "#0a0c1d",
    neonPrimary: "#1e3a8a",
    neonAccent: "#00faff",
    alert: "#ff073a",
    secondary: "#ffffff",
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontWeightRegular: "400",
    fontWeightBold: "700",
  },
  shadows: {
    softGlow: "0px 0px 8px rgba(30, 58, 138, 0.7)",
    buttonGlow: "0px 0px 12px rgba(255, 7, 58, 0.8)",
  },
  animations: {
    beaconFlash: css`${beaconFlash} 1s infinite`,
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.neonPrimary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    overflow-x: hidden;
    animation: ${css`${colorTransition}`} 10s infinite alternate; // Wrap keyframes in css helper
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }
`;
