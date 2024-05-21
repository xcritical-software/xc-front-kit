import { css, CSSObject, RuleSet } from 'styled-components';

export const CloseButton = (closeButtonStyles: CSSObject): RuleSet => css`
  .Toastify__close-button {
    ${closeButtonStyles}
  }

  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }
`;
