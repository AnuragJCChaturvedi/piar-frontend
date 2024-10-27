import styled from "styled-components";

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.alert};         // Beacon Red for borders
  box-shadow: ${({ theme }) => theme.shadows.buttonGlow};        // Red glow effect
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.secondary};               // Pure White for text
`;

export default Panel;
