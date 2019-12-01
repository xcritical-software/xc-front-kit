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

export const Header = styled.div.attrs(({ translateX }: IHeader) => ({
  style: {
    transform: `translateX(${translateX}px)`
  }
}))<IHeader>`
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
  margin: 0;
  padding: 0;
  ${({ theme }) => {
    if (theme.border)
      return `
      border-bottom: ${theme.header.border}
    `;
    return `
      border: ${theme.header.border}
    `;
  }}
`;

export const TotalBlock = styled.div.attrs(({ translateX }: IHeader) => ({
  style: {
    transform: `translateX(${translateX}px)`
  }
}))<IHeader>`
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
  margin: 0;
  padding: 0;
  ${({ theme }) => {
    if (theme.border)
      return `
      border-top: ${theme.header.border};
    `;
    return `
      border: ${theme.header.border};
    `;
  }}
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

export const BodyCell = styled.div<any>`
  ${({ firstRow }) => !firstRow && `border-top: 1px solid black`};
  display: flex;
  align-items: center;
  ${({ theme: { evenRowBackground, selectedRowColor, row, rowCellBorder }, selected, even }) => {
    let rowBorder = row.border !== "none";

    let background = "";
    let border = "";

    if (selected) background = selectedRowColor;
    else if (even) background = evenRowBackground;
    else background = row.backgroundColor;
    /* продолжить */
    if (rowBorder) return border;
    return `
      background: ${background}
    `;
  }}

  span {
    display: inline-block;
  }
  button {
    margin: 10px;
  }
`;

export const HeaderCell = styled.div.attrs(({ width }: IHeaderCell) => ({
  style: {
    width: `${width}px`
  }
}))<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${({ theme: { header } }) => {
    return `
      height: ${header.height};
    `;
  }}
`;

export const TotalCell = styled.div.attrs(({ width }: IHeaderCell) => ({
  style: {
    width: `${width}px`
  }
}))<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${({ theme }) => {
    let border = ``;
    const wrapperBorder = theme.border !== "none";
    const totalsBorder = theme.totals.border !== "none";

    if (totalsBorder && wrapperBorder) border = `border-right: ${theme.totalsCellBorder}`;
    else if (wrapperBorder && !totalsBorder)
      border = `border-top: ${theme.totalsCellBorder}
                border-right: ${theme.totalsCellBorder}`;
    else if (!totalsBorder && !wrapperBorder) border = `border: ${theme.totalsCellBorder}`;
    else if (!wrapperBorder && totalsBorder)
      border = `border-bottom: ${theme.totalsCellBorder}
                border-right: ${theme.totalsCellBorder}`;
    return `
      height: ${theme.totals.height};
      ${border}
    `;
  }}
`;

export const HeaderCellContent = styled.div<IHeaderCellContent>`
  width: calc(100% - 8px);
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ center }) => center && "justify-content: center;"}

  ${({ theme, isEmpty }) => {
    return `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
      span {
        font-size: ${theme.header.fontSize};
        color: ${theme.header.color};
        padding: ${theme.header.padding}
    `;
  }}
`;

export const TotalCellContent = styled.div<ITotalCellContent>`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ center }) => center && "justify-content: center;"};
  ${({ theme }) => {
    return `
    background-color: ${theme.totals.backgroundColor};
    span {
      font-size: ${theme.totals.fontSize};
      color: ${theme.totals.color};
      padding: ${theme.totals.padding};
      `;
  }}
`;

export const RightBorder = styled.div<IRightBorder>`
  width: 8px;
  position: relative;
  z-index: 9999999;
  cursor: w-resize;
  ${({ theme, isEmpty }) => {
    return `
      background-color: ${isEmpty ? theme.emptyHeaderCellBackgroung : theme.header.backgroundColor};
      border-right: ${theme.headerCellBorder};
    `;
  }}
`;

export const BodyCellContent = styled.div<IBodyCellContent>`
  overflow: hidden;
  ${({ center }) =>
    center &&
    `
    text-align: center;
    `}
  ${({ theme: { row, offsetExpand }, expandLevel }) => {
    return `
    width: calc(100% - ${expandLevel * offsetExpand}px);
    padding: ${row.padding};
    span {
      font-size: ${row.fontSize};
      color: ${row.color}
    }
    `;
  }}
`;

export const BodyCellOffset = styled.div<IBodyCellOffset>`
  ${({ theme: { offsetExpand }, expandLevel }) => {
    return `
    width: ${expandLevel * (offsetExpand * 2)}px;
    `;
  }}
`;

export const ExpandButtonWrapper = styled.div`
  width: 16px;
  height: 16px;
  border: none;
  outline: none;
  margin-left: 5px;
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
  ${({ theme: { border, borderRadius } }) => `
    border: ${border}
    border-radius: ${borderRadius};
  `}
`;

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
  ${({ theme }) => {
    return `
      background-color: ${theme.movingHeaderCellBackgroung};
      border: ${theme.headerCellBorder};
      span {
        font-size: ${theme.header.fontSize};
        color: ${theme.header.color};
        padding: ${theme.header.padding};
    `;
  }}
`;
