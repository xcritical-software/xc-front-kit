import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export const CloseButton = (
  closeButtonStyles: CSSObject
): FlattenSimpleInterpolation => css`
  .Toastify__close-button {
    ${closeButtonStyles}
  }

  .Toastify__close-button > svg {
    fill: currentColor;
    height: 16px;
    width: 14px;
  }

  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }
`;
