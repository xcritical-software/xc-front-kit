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
  ITotal,
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

export const getTotalStyles = ({ theme }: ITotal) => {
  if (theme.border !== 'none') {
    return `
      border-top: ${theme.totals.border};
    `;
  }
  return `
      border: ${theme.totals.border};
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
      }
    `;

export const getTotalCellContentStyles = ({ theme }: ITotalCellContent) => `
    background-color: ${theme.totals.backgroundColor};
    span {
      font-size: ${theme.totals.fontSize};
      color: ${theme.totals.color};
      padding: ${theme.totals.padding};
    }
      `;

export const getRightBorderStyles = ({ theme, isEmpty }: IRightBorder) => `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackground : theme.header.backgroundColor};
      border-right: ${theme.headerCellBorder};
    `;

export const getBodyCellContentStyles = ({
  theme: { row, selectedRowColor },
  selected,
}: IBodyCellContent) => `
    padding: ${row.padding};
    ${row.height ? `height: ${row.height}` : null};

    span {
      font-size: ${row.fontSize};
      color: ${selected ? selectedRowColor : row.color}
      ${row.height ? `
          white-space: nowrap;
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;` : null
}
    }
    `;

export const getBodyCellOffsetStyles = ({
  theme: { offsetExpand },
  expandLevel,
  center,
}: IBodyCellOffset) => `
    width: ${expandLevel * (center ? offsetExpand * 2 : offsetExpand)}px;
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
      }
    `;

export const getHeaderCellStyles = ({ theme, isEmpty }: IHeaderCell) => {
  let border = '';
  const wrapperBorder = theme.border !== 'none';
  const headerBorder = theme.header.border !== 'none';

  if (!wrapperBorder && !headerBorder) {
    border = `border-top: ${theme.headerCellBorder};
              border-bottom: ${theme.headerCellBorder};
              :first-child {
                border-left: ${theme.headerCellBorder}
              }`;
  } else if (!headerBorder) border = `border-bottom: ${theme.headerCellBorder}`;

  return `
  height: ${theme.header.height}px;
  background-color: ${isEmpty ? theme.emptyHeaderCellBackground : theme.header.backgroundColor};
  ${border}
  `;
};
