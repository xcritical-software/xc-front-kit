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

export const BodyCell = styled.div.attrs(({ selected }: any) => ({
  style: {
    backgroundColor: selected ? "lightblue" : "rgba(0,0,0,0)"
  }
}))<any>`
  ${({ firstRow }) => !firstRow && `border-top: 1px solid black`};
  display: flex;
  align-items: center;
  span {
    margin: 10px;
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
// export const TotalCell = styled(HeaderCell)``;
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
    if (theme.border && theme.totals.border) border = `border-right: ${theme.totalsCellBorder}`;
    else if (theme.border)
      border = `border-top: ${theme.totalsCellBorder}
                border-right: ${theme.totalsCellBorder}`;
    else if (!theme.border && !theme.totals.border) border = `border: ${theme.totalsCellBorder}`;

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

// export const TotalCellContent = styled(HeaderCellContent)<ITotalCellContent>`
//   width: 100%;
// `;
export const TotalCellContent = styled.div<ITotalCellContent>`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ theme, center }) => {
    return `
    background-color: ${theme.totals.backgroundColor};
    span {
      font-size: ${theme.totals.fontSize};
      color: ${theme.totals.color};
      padding: ${theme.totals.padding};
      ${center ? "justify-content: center;" : ""}
      `;
  }}
`;

export const RightBorder = styled.div<IRightBorder>`
  /* height: 38px; */
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

export const AntiSelect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999999;
  background-color: rgba(255, 0, 0, 0.5);
`;

export const BodyCellContent = styled.div<IBodyCellContent>`
  width: ${({ expandLevel }) => `calc(100% - ${expandLevel * 20}px)`};
  ${({ center }) =>
    center &&
    `
    text-align: center;
  `}
`;

export const BodyCellOffset = styled.div<IBodyCellOffset>`
  width: ${({ expandLevel }) => `${expandLevel * 20}px`};
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
  border: 1px solid black;
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
`;

export const AntiSelectLayer = styled.div``;

export const MovingElem = styled(HeaderCell).attrs(({ mouseMove, center }: IMovingElem) => ({
  style: {
    transform: `translateX(${mouseMove}px)`
  }
}))<IMovingElem>`
  position: absolute;
  left: ${({ startCoord: { x } }) => `${x}px`};
  top: ${({ startCoord: { y } }) => `${y - 1}px`};
  width: ${({ width }) => `${width}px`};
  outline: "1px solid black";
  z-index: 999999999999999;
  border: 2px solid red;
  display: flex;
  height: ${({ startCoord: { height } }) => `${height}px`};
  ${({ center }) => center && "justify-content: center;"}
  ${({ theme }) => {
    return `
      background-color: ${theme.movingHeaderCellBackgroung};
      span {
        font-size: ${theme.header.fontSize};
        color: ${theme.header.color};
        padding: ${theme.header.padding};
    `;
  }}
`;
