import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export const ToastBody = (
  toastBodyStyles: CSSObject
): FlattenSimpleInterpolation => css`
  .Toastify__toast-body {
    ${toastBodyStyles}
  }
`;
