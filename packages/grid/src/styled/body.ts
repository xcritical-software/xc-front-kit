import styled from 'styled-components';
import { getBodyCellStyles, getBodyCellContentStyles, getBodyCellOffsetStyles } from './utils';
import { IBodyCellContent, IBodyCellOffset } from '../interfaces';


export const Body = styled.div`
  :hover {
    div {
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #888;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      scrollbar-color: #888 #f1f1f1;
      scrollbar-width: thin;
    }
  }
  div {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
    }
    :focus {
      outline: none;
    }
    scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
  }
`;

export const BodyCell = styled.div<any>`
  display: flex;
  align-items: center;
  ${getBodyCellStyles}
  span {
    display: inline-block;
    font-weight: 400;
  }
  button {
    margin: 10px;
  }
`;

export const BodyCellContent = styled.div<IBodyCellContent>`
  overflow: hidden;
  ${({ center }) => center
    && `
    text-align: center;
    `}
  ${getBodyCellContentStyles}
`;

export const BodyCellOffset = styled.div<IBodyCellOffset>`
  ${getBodyCellOffsetStyles}
`;

export const ExpandButtonWrapper = styled.button`
  width: 16px;
  height: 16px;
  border: none;
  outline: 1px solid black;
  margin-left: 5px;
  padding: 0;
`;
