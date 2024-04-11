/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { css } from 'styled-components';

import {
  IHeader,
  IHeaderCell,
  ITotalCellContent,
  IBodyCellOffset,
  IWrapper,
  IBodyCellContentWrapper,
  ITotalCell,
  ITotal,
  IRightBorder,
  IPinnedProps,
} from '../interfaces';

export const getHeaderStyles = ({ theme }: IHeader) => {
  if (theme.border !== 'none') {
    return css`
      background-color: ${theme.header?.backgroundColor};
      border-bottom: ${theme.header?.border};
    `;
  }

  return css`
    background-color: ${theme.header?.backgroundColor};
    border: ${theme.header?.border};
  `;
};

export const getGroupHeaderStyles = ({ theme }: IHeader) => {
  if (theme.border !== 'none') {
    return css`
      background-color: ${theme.header?.backgroundColor};
      border-bottom: ${theme.header?.border};
    `;
  }

  return css`
    background-color: ${theme.header?.backgroundColor};
    border: ${theme.header?.border};
  `;
};

export const getTotalStyles = ({ theme }: ITotal) => {
  if (theme.border !== 'none') {
    return css`
      border-top: ${theme.totals?.border};
    `;
  }

  return css`
    border: ${theme.totals?.border};
  `;
};

export const getBodyCellStyles = ({
  theme: {
    evenRowBackground,
    selectedRowBackgroundColor,
    row,
    rowCellBorder,
    header,
  },
  selected,
  even,
  firstRow,
  depth,
}: any) => {
  let background = '';

  if (selected) background = selectedRowBackgroundColor;
  else if (even) background = evenRowBackground;
  else background = row.backgroundColor;

  const headerBorder = header.border !== 'none';
  const borderTop = !firstRow || !headerBorder ? row.border : 'none';
  const cellBorder = firstRow
    ? `border-right: ${rowCellBorder};
       border-left: ${rowCellBorder};
       border-bottom: ${rowCellBorder}`
    : `border-top: ${rowCellBorder};
       border-right: ${rowCellBorder};
       border-left: ${rowCellBorder};
       border-bottom: ${rowCellBorder};
      `;

  return css`
    padding-left: ${depth * 2}rem;
    background: ${background};
    border-top: ${borderTop};
    ${rowCellBorder !== 'none' ? cellBorder : ''};
  `;
};

export const getTotalCellStyles = ({ theme }: ITotalCell) => {
  let border = '';
  const wrapperBorder = theme.border !== 'none';
  const totalsBorder = theme.totals?.border !== 'none';

  if (totalsBorder && wrapperBorder)
    border = `border-right: ${theme.totalsCellBorder}`;
  else if (wrapperBorder && !totalsBorder) {
    border = `border-top: ${theme.totalsCellBorder}
              border-right: ${theme.totalsCellBorder}`;
  } else if (!totalsBorder && !wrapperBorder)
    border = `border: ${theme.totalsCellBorder}`;
  else if (!wrapperBorder && totalsBorder) {
    border = `border-right: ${theme.totalsCellBorder}`;
  }

  return `
    height: ${theme.totals?.height}px;
    ${border}
    `;
};

export const getHeaderCellContentStyles = () => ``;

export const getTotalCellContentStyles = ({ theme }: ITotalCellContent) => `
    background-color: ${theme.totals?.backgroundColor};
    span {
      font-size: ${theme.totals?.fontSize};
      color: ${theme.totals?.color};
      padding: ${theme.totals?.padding};
    }
      `;

export const getBodyCellContentStyles = ({
  theme: { row },
  rowHeight,
  center,
}: IBodyCellContentWrapper) => css`
  padding: ${row?.padding};
  ${rowHeight ? `height: ${rowHeight}px` : null};
  ${center
    ? css`
        justify-content: center;
      `
    : null};
`;

export const getBodyCellOffsetStyles = ({
  theme: { offsetExpand },
  expandLevel,
  center,
}: IBodyCellOffset) => `
    width: ${expandLevel * (center ? offsetExpand! * 2 : offsetExpand!)}px;
    `;

export const getWrapperStyles = ({
  theme: { border, borderRadius },
}: IWrapper) => `
    border: ${border};
    border-radius: ${borderRadius}px;
  `;

export const getHeaderCellStyles = ({ theme, isEmpty }: IHeaderCell) => {
  let border = '';
  const wrapperBorder = theme.border !== 'none';
  const headerBorder = theme.header?.border !== 'none';

  if (!wrapperBorder && !headerBorder) {
    border = `border-top: ${theme.headerCellBorder};
              border-bottom: ${theme.headerCellBorder};
              :first-child {
                border-left: ${theme.headerCellBorder}
              }`;
  } else if (!headerBorder) border = `border-bottom: ${theme.headerCellBorder}`;

  return `
  height: ${theme.header?.height}px;
  background-color: ${
    isEmpty ? theme.emptyHeaderCellBackground : theme.header?.backgroundColor
  };
  ${border}
  `;
};

export const getPinnedStyles = ({
  pinned,
  pinPagging,
  isFirstPinned,
}: IPinnedProps) => {
  if (pinned) {
    return css`
      position: sticky;
      ${pinned === 'left' ? 'left' : 'right'}: ${pinPagging}px;
      z-index: 1;
      ${isFirstPinned
        ? `box-shadow: ${
            pinned === 'left'
              ? '-4px 0 4px -4px gray inset'
              : '4px 0 4px -4px gray inset'
          };`
        : `box-shadow: ${isFirstPinned};`}
    `;
  }

  return '';
};

export const getExpandButtonStyles = ({ theme }) => `
    margin: ${theme.expandButtonMargin}
  `;

export const getRightBorderStyles = ({ theme }: IRightBorder) => `
      background-color: ${theme.header?.backgroundColor};
      border-right: ${theme.headerCellBorder};
    `;
