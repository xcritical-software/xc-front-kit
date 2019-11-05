import { css } from 'styled-components';


export const Toast = css`
  .Toastify__toast {
    position: relative;
    min-height: 64px;
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 8px;
    border-radius: 1px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    max-height: 800px;
    overflow: hidden;
    font-family: sans-serif;
    cursor: pointer;
    direction: ltr;
  }
  
  .Toastify__toast--rtl {
    direction: rtl;
  }
  
  .Toastify__toast--default {
    background: #fff;
    color: #aaa;
  }
  
  .Toastify__toast--info{
    background: #3498db;
  }
  
  .Toastify__toast--success {
    background: #07bc0c;
  }
  
  .Toastify__toast--warning {
    background: #f1c40f;
  }
  
  .Toastify__toast--error {
    background: #e74c3c;
  }
  
  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0;
    }
  }
`;
