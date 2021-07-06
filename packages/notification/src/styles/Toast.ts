import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export const Toast = (
  toastStyles: CSSObject
): FlattenSimpleInterpolation => css`
  .Toastify__toast {
    ${toastStyles}
  }

  .Toastify__toast--rtl {
    direction: rtl;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0;
    }
  }
`;
