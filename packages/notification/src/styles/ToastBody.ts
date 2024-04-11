import { css, CSSObject, RuleSet } from 'styled-components';

export const ToastBody = (toastBodyStyles: CSSObject): RuleSet => css`
  .Toastify__toast-body {
    ${toastBodyStyles}
  }
`;
