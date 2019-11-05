import { css } from 'styled-components';


export const CloseButton = css`
  .Toastify__close-button {
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    align-self: flex-start;
  }
  
  .Toastify__close-button--default {
    color: #000;
    opacity: 0.3;
  }
  
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }
`;
