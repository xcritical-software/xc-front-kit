import styled, { css } from 'styled-components';

import {
  IBodyCellContent,
  IBodyCellContentWrapper,
  IBodyCellOffset,
  IRow,
  ITBody,
} from '../interfaces';

import {
  getBodyCellStyles,
  getBodyCellContentStyles,
  getBodyCellOffsetStyles,
  getExpandButtonStyles,
  getPinnedStyles,
  getRowStyles,
} from './utils';

const scrollbarSize = 8;

export const TotalsShift = styled.div`
  height: ${scrollbarSize}px;
`;

const hiddenScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0);
    }
    scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`;
const rightScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: ${scrollbarSize}px;
      height: 0px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`;
const bottomScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: 0px;
      height: ${scrollbarSize}px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`;
const fullScrollbar = css`
  div {
    ::-webkit-scrollbar {
      width: ${scrollbarSize}px;
      height: ${scrollbarSize}px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    :focus {
      outline: none;
    }
  }
`;

const getScrollbar = ({ rightScroll, bottomScroll }) => {
  if (rightScroll && bottomScroll) return fullScrollbar;

  if (rightScroll) return rightScrollbar;

  if (bottomScroll) return bottomScrollbar;

  return hiddenScrollbar;
};

export const Body = styled.div<any>`
  ${getScrollbar};
`;

export const BodyCell = styled.td.attrs<any>(({ 'data-column-id': id }) => ({
  style: {
    width: `calc(var(--col-${id}-size) * 1px)`,
  },
}))`
  display: flex;
  position: relative;
  align-items: center;
  ${({ autoFitLastColumn }) => autoFitLastColumn && 'flex-grow: 1;'};

  ${getBodyCellStyles}
  ${getPinnedStyles}
`;

export const BodyCellContentWrapper = styled.div<IBodyCellContentWrapper>`
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  ${getBodyCellContentStyles}
`;

export const BodyCellContent = styled.div<IBodyCellContent>`
  display: inline-block;
  font-weight: 400;

    font-size: ${({ theme: { row } }) => row?.fontSize};
    color: ${({ selected, theme: { selectedRowColor, row } }) =>
      selected ? selectedRowColor : row?.color};
    display: flex;
    ${({ rowHeight }) =>
      rowHeight
        ? css`
            white-space: nowrap;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
          `
        : null}
  }
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

export const TBody = styled.tbody.attrs<ITBody>(({ height }) => ({
  style: {
    height: `${height}px`,
  },
}))`
  display: grid;
  position: relative;
`;

export const Row = styled.tr.attrs<IRow>(({ translateY }) => ({
  style: {
    top: `${translateY}px`,
  },
}))`
  display: flex;
  position: absolute;
  width: 100%;
  ${getRowStyles}
`;

export const HiddenFocusElement = styled.div`
  position: fixed;
  width: 0;
  height: 0;
  top: 0px;
  left: 0px;
  outline: 0px;
`;
