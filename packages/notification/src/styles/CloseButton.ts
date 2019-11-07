import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';


export const CloseButton = (closeButtonStyles: CSSObject): FlattenSimpleInterpolation => css`
  .Toastify__close-button {
    ${closeButtonStyles}
  }
  
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }
`;
