import styled from 'styled-components';
import {
  IHeader, ITotalCellContent, ITotal, ITotalCell,
} from '../interfaces';
import { getTotalStyles, getTotalCellStyles, getTotalCellContentStyles } from './utils';


export const TotalBlock = styled.div.attrs(({ translateX }: ITotal) => ({
  style: {
    transform: `translateX(${translateX}px)`,
  },
}))<IHeader>`
  overflow: hidden;
  width: ${({ width }) => `calc(${width}px + 100%)`};
  margin: 0;
  padding: 0;
  ${getTotalStyles}
`;


export const TotalCell = styled.div.attrs(({ width }: ITotalCell) => ({
  style: {
    width: `${width}px`,
  },
}))<ITotalCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${getTotalCellStyles}
`;


export const TotalCellContent = styled.div<ITotalCellContent>`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${({ center }) => center && 'justify-content: center;'};
  ${getTotalCellContentStyles}
`;
