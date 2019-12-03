import styled from 'styled-components';
import { getBodyCellStyles, getBodyCellContentStyles, getBodyCellOffsetStyles } from './utils';
import { IBodyCellContent, IBodyCellOffset } from '../interfaces';


export const Body = styled.div`
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
      :focus {
        outline: none;
      }
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
  width: 100%;
  ${({ center }) => center
    && `
    text-align: center;
    `}
  ${getBodyCellContentStyles}
`;

export const BodyCellOffset = styled.div<IBodyCellOffset>`
  flex-shrink: 0;
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
