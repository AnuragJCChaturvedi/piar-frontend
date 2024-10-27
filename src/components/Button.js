import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.neonAccent};  // Neon Cyan
  color: ${({ theme }) => theme.colors.secondary};              // Pure White
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  box-shadow: ${({ theme }) => theme.shadows.buttonGlow};
  border-radius: 5px;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 15px ${({ theme }) => theme.colors.alert};  // Beacon Red hover
    background-color: ${({ theme }) => theme.colors.alert};         // Red on hover
  }
`;

export default Button;
