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
} from '../interfaces';


export const getHeaderStyles = ({ theme }: IHeader) => {
  if (theme.border !== 'none') {
    return `
      border-bottom: ${theme.header.border};
    `;
  }
  return `
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
    evenRowBackground, selectedRowColor, row, rowCellBorder, header,
  },
  selected,
  even,
  firstRow,
}: any) => {
  let background = '';
  if (selected) background = selectedRowColor;
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

export const getTotalCellStyles = ({ theme }: IHeaderCell) => {
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

export const getHeaderCellContentStyles = ({ theme, isEmpty }: IHeaderCellContent) => `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
      span {
        font-size: ${theme.header.fontSize};
        color: ${theme.header.color};
        padding: ${theme.header.padding}px;
    `;

export const getTotalCellContentStyles = ({ theme }: ITotalCellContent) => `
    background-color: ${theme.totals.backgroundColor};
    span {
      font-size: ${theme.totals.fontSize};
      color: ${theme.totals.color};
      padding: ${theme.totals.padding}px;
      `;

export const getRightBorderStyles = ({ theme, isEmpty }: IRightBorder) => `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
      border-right: ${theme.headerCellBorder};
    `;

export const getBodyCellContentStyles = ({
  theme: { row, offsetExpand },
  expandLevel,
}: IBodyCellContent) => `
    width: calc(100% - ${expandLevel * offsetExpand}px);
    padding: ${row.padding}px;
    span {
      font-size: ${row.fontSize};
      color: ${row.color}
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
      background-color: ${theme.movingHeaderCellBackgroung};
      border: ${theme.headerCellBorder};
      color: ${theme.header.color};
      span {
        font-size: ${theme.header.fontSize};
        padding: ${theme.header.padding}px;
    `;

export const getHeaderCellStyles = ({ theme: { header } }: IHeaderCell) => `
      height: ${header.height}px;
    `;
