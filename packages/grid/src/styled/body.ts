import styled, { css } from 'styled-components';
import {
  getBodyCellStyles, getBodyCellContentStyles, getBodyCellOffsetStyles, getExpandButtonStyles,
} from './utils';
import { IBodyCellContent, IBodyCellOffset } from '../interfaces';


const hiddenScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: 2px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0);
    }
    scrollbar-color: rgba(0,0,0,0) rgba(0,0,0,0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`
const rightScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: 8px;
      height: 2px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.8);
    }
    scrollbar-color: rgba(0,0,0,0.2) rgba(0,0,0,0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`
const bottomScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: 2px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.8);
    }
    scrollbar-color: rgba(0,0,0,0.2) rgba(0,0,0,0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`
const fullScrollbar = css`
 div {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.8);
    }
    scrollbar-color: rgba(0,0,0,0.2) rgba(0,0,0,0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`







const getScrollbar = ({ 
  rightScroll,
  bottomScroll }) => {
  if (rightScroll && bottomScroll) return fullScrollbar;
  if (rightScroll) return rightScrollbar;
  if (bottomScroll) return bottomScrollbar;
  return hiddenScrollbar 
}

export const Body = styled.div<any>`
  ${getScrollbar}
`;

export const BodyCell = styled.div<any>`
  display: flex;
  align-items: center;
  ${getBodyCellStyles}
  span {
    display: inline-block;
    font-weight: 400;
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
  padding: 0;
  ${getExpandButtonStyles}
`;


export const ShiftInsteadButton = styled.div`
  width: 16px;
  float: left;
  ${getExpandButtonStyles}
`;
