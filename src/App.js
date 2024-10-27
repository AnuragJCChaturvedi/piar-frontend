import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./theme";
import HomePage from "./components/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
