import styled from "styled-components";
import {
  IHeader,
  IHeaderCell,
  IHeaderCellContent,
  ITotalCellContent,
  IRightBorder,
  IBodyCellContent,
  IBodyCellOffset,
  IWrapper,
  IMovingElem
} from "../interfaces";

const getHeaderStyles = ({ theme }: IHeader) => {
  if (theme.border !== "none")
    return `
      border-bottom: ${theme?.header?.border}
    `;
  return `
      border: ${theme?.header?.border}
    `;
};

export const Header = styled.div.attrs(({ translateX }: IHeader) => ({
  style: {
    transform: `translateX(${translateX}px)`
  }
}))<IHeader>`
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
  margin: 0;
  padding: 0;
  ${getHeaderStyles}
`;

const getTotalStyles = ({ theme }: IHeader) => {
  if (theme.border)
    return `
      border-top: ${theme?.header?.border};
    `;
  return `
      border: ${theme?.header?.border};
    `;
};

export const TotalBlock = styled.div.attrs(({ translateX }: IHeader) => ({
  style: {
    transform: `translateX(${translateX}px)`
  }
}))<IHeader>`
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
  margin: 0;
  padding: 0;
  ${getTotalStyles}
`;

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

const getBodyCellStyles = ({
  theme: { evenRowBackground, selectedRowColor, row, rowCellBorder },
  selected,
  even,
  firstRow
}: any) => {
  let background = "";
  if (selected) background = selectedRowColor;
  else if (even) background = evenRowBackground;
  else background = row.backgroundColor;
  const borderTop = !firstRow ? row.border : "none";
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
      ${rowCellBorder !== "none" && cellBorder};
    `;
};

export const BodyCell = styled.div<any>`
  display: flex;
  align-items: center;
  ${getBodyCellStyles}

  span {
    display: inline-block;
  }
  button {
    margin: 10px;
  }
`;

const getHeaderCellStyles = ({ theme: { header } }: IHeaderCell) => {
  return `
      height: ${header?.height};
    `;
};

export const HeaderCell = styled.div.attrs(({ width }: IHeaderCell) => ({
  style: {
    width: `${width}px`
  }
}))<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${getHeaderCellStyles}
`;

const getTotalCellStyles = ({ theme }: IHeaderCell) => {
  let border = ``;
  const wrapperBorder = theme.border !== "none";
  const totalsBorder = theme?.totals?.border !== "none";

  if (totalsBorder && wrapperBorder) border = `border-right: ${theme.totalsCellBorder}`;
  else if (wrapperBorder && !totalsBorder)
    border = `border-top: ${theme.totalsCellBorder}
                border-right: ${theme.totalsCellBorder}`;
  else if (!totalsBorder && !wrapperBorder) border = `border: ${theme.totalsCellBorder}`;
  else if (!wrapperBorder && totalsBorder)
    border = `border-bottom: ${theme.totalsCellBorder}
                border-right: ${theme.totalsCellBorder}`;
  return `
      height: ${theme?.totals?.height};
      ${border}
    `;
};

export const TotalCell = styled.div.attrs(({ width }: IHeaderCell) => ({
  style: {
    width: `${width}px`
  }
}))<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${getTotalCellStyles}
`;

const getHeaderCellContentStyles = ({ theme, isEmpty }: IHeaderCellContent) => {
  return `
      background-color: ${
        isEmpty ? theme.emptyHeaderCellBackgroung : theme?.header?.backgroundColor
      };
      span {
        font-size: ${theme?.header?.fontSize};
        color: ${theme?.header?.color};
        padding: ${theme?.header?.padding}
    `;
};

export const HeaderCellContent = styled.div<IHeaderCellContent>`
  width: calc(100% - 8px);
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ center }) => center && "justify-content: center;"}
  ${getHeaderCellContentStyles}
`;

const getTotalCellContentStyles = ({ theme }: ITotalCellContent) => {
  return `
    background-color: ${theme.totals.backgroundColor};
    span {
      font-size: ${theme.totals.fontSize};
      color: ${theme.totals.color};
      padding: ${theme.totals.padding};
      `;
};

export const TotalCellContent = styled.div<ITotalCellContent>`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ center }) => center && "justify-content: center;"};
  ${getTotalCellContentStyles}
`;

const getRightBorderStyles = ({ theme, isEmpty }: IRightBorder) => {
  return `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
      border-right: ${theme.headerCellBorder};
    `;
};

export const RightBorder = styled.div<IRightBorder>`
  width: 8px;
  position: relative;
  z-index: 9999999;
  cursor: w-resize;
  ${getRightBorderStyles}
`;

const getBodyCellContentStyles = ({
  theme: { row, offsetExpand },
  expandLevel
}: IBodyCellContent) => {
  return `
    width: calc(100% - ${expandLevel * offsetExpand}px);
    padding: ${row.padding};
    span {
      font-size: ${row.fontSize};
      color: ${row.color}
    }
    `;
};

export const BodyCellContent = styled.div<IBodyCellContent>`
  overflow: hidden;
  ${({ center }) =>
    center &&
    `
    text-align: center;
    `}
  ${getBodyCellContentStyles}
`;

const getBodyCellOffsetStyles = ({ theme: { offsetExpand }, expandLevel }: IBodyCellOffset) => {
  return `
    width: ${expandLevel * (offsetExpand * 2)}px;
    `;
};

export const BodyCellOffset = styled.div<IBodyCellOffset>`
  ${getBodyCellOffsetStyles}
`;

export const ExpandButtonWrapper = styled.div`
  width: 16px;
  height: 16px;
  border: none;
  outline: none;
  margin-left: 5px;
`;

const getWrapperStyles = ({ theme: { border, borderRadius } }: IWrapper) => `
    border: ${border}
    border-radius: ${borderRadius};
  `;

export const Wrapper = styled.div<IWrapper>`
  width: ${({ width }) => `${width}px`};
  overflow: hidden;
  border-radius: 10px;
  ${({ isSelectable }) =>
    isSelectable &&
    `
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
    `}
  ${getWrapperStyles}
`;

const getMovingElemStyles = ({ theme }: IMovingElem) => {
  return `
      background-color: ${theme.movingHeaderCellBackgroung};
      border: ${theme.headerCellBorder};
      span {
        font-size: ${theme.header.fontSize};
        color: ${theme.header.color};
        padding: ${theme.header.padding};
    `;
};

export const MovingElem = styled(HeaderCell).attrs(({ mouseMove }: IMovingElem) => ({
  style: {
    transform: `translateX(${mouseMove}px)`
  }
}))<IMovingElem>`
  position: absolute;
  left: ${({ startCoord: { x } }) => `${x}px`};
  top: ${({ startCoord: { y } }) => `${y - 1}px`};
  width: ${({ width }) => `${width}px`};
  outline: "1px solid black";
  z-index: 9999999999;
  border: 2px solid red;
  display: flex;
  height: ${({ startCoord: { height } }) => `${height}px`};
  ${({ center }) => center && "justify-content: center;"}
  ${getMovingElemStyles}
`;
