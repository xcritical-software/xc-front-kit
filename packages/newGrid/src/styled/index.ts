import styled from 'styled-components';
import {
  IHeader,
  IHeaderCell,
  IHeaderCellContent,
  ITotalCellContent,
  IRightBorder,
  IBodyCellContent,
  IBodyCellOffset,
  IWrapper,
  IMovingElem,
} from '../interfaces';


export const Header = styled.div.attrs(({ translateX }: IHeader) => ({
  style: {
    transform: `translateX(${translateX}px)`,
  },
}))<IHeader>`
  height: 39px;
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
`;

export const TotalBlock = styled(Header)`
  border-top: 1px solid black;
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
  }
`;

// interface IBodyCell {
//   selected: any;
//   style: React.CSSProperties;
// }

export const BodyCell = styled.div.attrs(({ selected }: any) => ({
  style: {
    backgroundColor: selected ? 'lightblue' : 'rgba(0,0,0,0)',
  },
}))<any>`
  border-top: 1px solid black;
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
    width: `${width}px`,
  },
}))<IHeaderCell>`
  outline: 1px solid black;
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  span {
    margin: 10px;
    display: inline-block;
    height: 39px;
  }
`;
export const TotalCell = styled(HeaderCell)``;

export const HeaderCellContent = styled.div<IHeaderCellContent>`
  width: calc(100% - 8px);
  overflow: hidden;
  ${({ center }) => center && 'text-align: center;'};
  background-color: ${({ isEmpty }) => (isEmpty ? 'lightblue' : 'yellow')};
`;

export const TotalCellContent = styled(HeaderCellContent)<ITotalCellContent>`
  width: 100%;
`;

export const RightBorder = styled.div<IRightBorder>`
  height: 38px;
  width: 8px;
  position: relative;
  z-index: 9999999;
  cursor: w-resize;
  background-color: ${({ isEmpty }) => (isEmpty ? 'lightblue' : 'yellow')};
  border-right: 1px solid black;
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
  ${({ center }) => center
    && `
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
  ${({ isSelectable }) => isSelectable
    && `
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
    transform: `translateX(${mouseMove}px)`,
    textAlign: center ? 'center' : undefined,
  },
}))<IMovingElem>`
  position: absolute;
  left: ${({ startCoord: { x } }) => `${x}px`};
  top: ${({ startCoord: { y } }) => `${y}px`};
  width: ${({ width }) => `${width}px`};
  outline: "1px solid black";
  z-index: 999999999999999;
  height: ${({ startCoord: { height } }) => `${height}px`};
`;
