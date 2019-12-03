import {
  IHeader,
  IHeaderCell,
  IHeaderCellContent,
  ITotalCellContent,
  IRightBorder,
  IBodyCellOffset,
  IWrapper,
  IMovingElem,
  IBodyCellContent,
  ITotalCell,
} from '../interfaces';


export const getHeaderStyles = ({ theme }: IHeader) => {
  if (theme.border !== 'none') {
    return `
      background-color: ${theme.header.backgroundColor}
      border-bottom: ${theme.header.border};
    `;
  }
  return `
      background-color: ${theme.header.backgroundColor}
      border: ${theme.header.border};
    `;
};

export const getTotalStyles = ({ theme }: IHeader) => {
  if (theme.border !== 'none') {
    return `
      border-top: ${theme.header.border};
    `;
  }
  return `
      border: ${theme.header.border};
    `;
};

export const getBodyCellStyles = ({
  theme: {
    evenRowBackground, selectedRowBackgroundColor, row, rowCellBorder, header,
  },
  selected,
  even,
  firstRow,
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
       border-bottom: ${rowCellBorder}  `;

  return `
      background: ${background};
      border-top: ${borderTop};
      ${rowCellBorder !== 'none' ? cellBorder : ''};
    `;
};

export const getTotalCellStyles = ({ theme }: ITotalCell) => {
  let border = '';
  const wrapperBorder = theme.border !== 'none';
  const totalsBorder = theme.totals.border !== 'none';

  if (totalsBorder && wrapperBorder) border = `border-right: ${theme.totalsCellBorder}`;
  else if (wrapperBorder && !totalsBorder) {
    border = `border-top: ${theme.totalsCellBorder}
              border-right: ${theme.totalsCellBorder}`;
  } else if (!totalsBorder && !wrapperBorder) border = `border: ${theme.totalsCellBorder}`;
  else if (!wrapperBorder && totalsBorder) {
    border = `border-right: ${theme.totalsCellBorder}`;
  }

  return `
    height: ${theme.totals.height}px;
    ${border}
    `;
};

export const getHeaderCellContentStyles = ({ theme }: IHeaderCellContent) => `
      span {
        font-size: ${theme.header.fontSize};
        color: ${theme.header.color};
        padding: ${theme.header.padding};
    `;

export const getTotalCellContentStyles = ({ theme }: ITotalCellContent) => `
    background-color: ${theme.totals.backgroundColor};
    span {
      font-size: ${theme.totals.fontSize};
      color: ${theme.totals.color};
      padding: ${theme.totals.padding};
      `;

export const getRightBorderStyles = ({ theme, isEmpty }: IRightBorder) => `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
      border-right: ${theme.headerCellBorder};
    `;

export const getBodyCellContentStyles = ({
  theme: { row, offsetExpand, selectedRowColor },
  expandLevel,
  selected,
}: IBodyCellContent) => `
    width: calc(100% - ${expandLevel * offsetExpand}px);
    padding: ${row.padding};
    span {
      font-size: ${row.fontSize};
      color: ${selected ? selectedRowColor : row.color}
    }
    `;

export const getBodyCellOffsetStyles = ({
  theme: { offsetExpand },
  expandLevel,
}: IBodyCellOffset) => `
    width: ${expandLevel * (offsetExpand * 2)}px;
    `;

export const getWrapperStyles = ({ theme: { border, borderRadius } }: IWrapper) => `
    border: ${border}
    border-radius: ${borderRadius}px;
  `;

export const getMovingElemStyles = ({ theme }: IMovingElem) => `
      background-color: ${theme.movingHeaderCellBackgroungColor};
      border: ${theme.headerCellBorder};
      span {
        color: ${theme.movingHeaderCellColor};
        font-size: ${theme.header.fontSize};
        padding: ${theme.header.padding};
    `;

export const getHeaderCellStyles = ({ theme, isEmpty }: IHeaderCell) => {
  let border = '';
  const wrapperBorder = theme.border !== 'none';
  const headerBorder = theme.header.border !== 'none';

  if (!wrapperBorder && !headerBorder) {
    border = `border-top: ${theme.headerCellBorder};
              border-bottom: ${theme.headerCellBorder};`;
  } else if (!headerBorder) border = `border-bottom: ${theme.headerCellBorder}`;

  return `
  height: ${theme.header.height}px;
  background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
  ${border}
  `;
};
