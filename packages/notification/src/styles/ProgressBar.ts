import { css, CSSObject, RuleSet } from 'styled-components';

export const ProgressBar = (progressBarStyles: CSSObject): RuleSet => css`
  .Toastify__progress-bar {
    ${progressBarStyles}
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }

  .Toastify__progress-bar--animated {
    animation: Toastify__trackProgress linear 1 forwards;
  }

  .Toastify__progress-bar--controlled {
    transition: transform 0.2s;
  }

  .Toastify__progress-bar--rtl {
    right: 0;
    left: initial;
    transform-origin: right;
  }
`;
