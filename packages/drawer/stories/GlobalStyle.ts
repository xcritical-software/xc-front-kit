import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0;
  }
  
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;
