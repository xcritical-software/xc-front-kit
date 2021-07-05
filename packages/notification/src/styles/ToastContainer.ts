import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';

export const ToastContainer = (
  containerStyles: CSSObject
): FlattenSimpleInterpolation => css`
  .Toastify__toast-container {
    ${containerStyles}
  }

  .Toastify__toast-container--top-left {
    top: 1em;
    left: 1em;
  }

  .Toastify__toast-container--top-center {
    top: 1em;
    left: 50%;
    margin-left: -160px;
  }

  .Toastify__toast-container--top-right {
    top: 1em;
    right: 1em;
  }

  .Toastify__toast-container--bottom-left {
    bottom: 1em;
    left: 1em;
  }

  .Toastify__toast-container--bottom-center {
    bottom: 1em;
    left: 50%;
    margin-left: -160px;
  }

  .Toastify__toast-container--bottom-right {
    bottom: 1em;
    right: 1em;
  }

  .Toastify__toast:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
    }

    .Toastify__toast-container--top-left,
    .Toastify__toast-container--top-center,
    .Toastify__toast-container--top-right {
      top: 0;
    }

    .Toastify__toast-container--bottom-left,
    .Toastify__toast-container--bottom-center,
    .Toastify__toast-container--bottom-right {
      bottom: 0;
    }

    .Toastify__toast-container--rtl {
      right: 0;
      left: initial;
    }
  }
`;
