import styled from 'styled-components';
import {
  IHeader, IHeaderCell, IHeaderCellContent, IRightBorder, IMovingElem,
} from '../interfaces';
import {
  getHeaderStyles,
  getHeaderCellStyles,
  getHeaderCellContentStyles,
  getRightBorderStyles,
  getMovingElemStyles,
} from './utils';


export const Header = styled.div.attrs(({ translateX }: IHeader) => ({
  style: {
    transform: `translateX(${translateX}px)`,
  },
}))<IHeader>`
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
  margin: 0;
  padding: 0;
  ${getHeaderStyles}
`;

export const HeaderCell = styled.div.attrs(({ width }: IHeaderCell) => ({
  style: {
    width: `${width}px`,
  },
}))<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${getHeaderCellStyles}
`;


export const HeaderCellContent = styled.div<IHeaderCellContent>`
  width: calc(100% - 8px);
  overflow: hidden;
  display: flex;
  align-items: center;

  cursor: ${({ shouldMovingColumns }) => shouldMovingColumns && 'grab'};
  ${({ center }) => center && 'justify-content: center;'}
  ${getHeaderCellContentStyles}
`;

export const RightBorder = styled.div<IRightBorder>`
  width: 8px;
  position: relative;
  z-index: 9999999;
  cursor: ${({ shouldChangeColumnsWidth }) => shouldChangeColumnsWidth && 'w-resize'};
  ${getRightBorderStyles}
`;


export const MovingElem = styled(HeaderCell).attrs(({ mouseMove }: IMovingElem) => ({
  style: {
    transform: `translateX(${mouseMove}px)`,
  },
}))<IMovingElem>`
  position: absolute;
  left: ${({ startCoord: { x } }) => `${x}px`};
  width: ${({ width }) => `${width}px`};
  outline: "1px solid black";
  z-index: 9999999999;
  cursor: grabbing;
  display: flex;
  height: ${({ startCoord: { height } }) => `${height}px`};
  ${({ center }) => center && 'justify-content: center;'}
  ${getMovingElemStyles}
`;
