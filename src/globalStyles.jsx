import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: linear-gradient(135deg, #1d1d27, #0f0f14);
    color: #333;
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
`;

export default GlobalStyles;
