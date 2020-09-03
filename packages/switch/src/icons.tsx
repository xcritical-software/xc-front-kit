import React from 'react';
import styled, { keyframes } from 'styled-components';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader: React.FC = () => {
  const SVG = styled.svg`
      margin: auto;
      z-index: 1;
      position: relative;
      width: 75%;
      height: 75%;
     
      animation: ${rotate} 0.8s linear infinite;
    `;

  return (
    <SVG width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.543 6.95703C12.2903 6.95703 12.0859 6.75264 12.0859 6.5C12.0859 5.7459 11.9387 5.01465 11.6467 4.32529C11.3658 3.66166 10.9593 3.05857 10.4495 2.54922C9.94072 2.03876 9.3375 1.63215 8.67344 1.35205C7.98535 1.06133 7.2541 0.914062 6.5 0.914062C6.24736 0.914062 6.04297 0.709668 6.04297 0.457031C6.04297 0.204395 6.24736 0 6.5 0C7.37725 0 8.2291 0.171387 9.03018 0.511621C9.80459 0.837891 10.499 1.30762 11.0957 1.9043C11.6924 2.50098 12.1608 3.19668 12.4884 3.96982C12.8273 4.7709 12.9987 5.62275 12.9987 6.5C13 6.75264 12.7956 6.95703 12.543 6.95703V6.95703Z"
        fill="currentColor"
      />
    </SVG>
  );
};

export default React.memo(Loader);
