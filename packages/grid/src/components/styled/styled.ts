import styled from 'styled-components';
import { ITableTheme } from '../utils/get-styles';
import {
  IStyledRow,
  IStyledCell,
} from '../../interfaces';


export const StyledCell = styled.div<IStyledCell>`
  padding: ${({
    theme: {
      cell: {
        top, right, bottom, left,
      },

    },
  }): string => `${top} ${right} ${bottom} ${left}`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  font-size: ${({ theme: { cell: { font: { size } } } }): string => `${size}`};
  font-weight: ${({ theme: { cell: { font: { weight } } } }): string => `${weight}`};
  color: ${({ theme: { cell: { font: { color } } } }): string => `${color}`};
  border-right: ${({ theme: { cell: { borderRight: { width, color, style } } } }): string => `${width} ${color} ${style}`};
  font-family: inherit;
  width: ${({ width }): string => `${width}px`};
  box-sizing: border-box;
`;


export const HeaderStyled = styled.div<IStyledCell>`
   padding: ${({
    theme: {
      header: {
        padding: {
          top, right, bottom, left,
        },
      },
    },
  }): string => `${top} ${right} ${bottom} ${left}`};
  width: ${({ width }): string => `${width}px`};



  text-align: left;
  font-family: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  background-color: ${({ theme: { headerBackgroundColor } }): string => headerBackgroundColor};
  :hover {
    background-color: ${({ theme: { headerHoverColor } }): string => headerHoverColor};
  }
  font-size: ${({ theme: { header: { font: { size } } } }): string => `${size}`};
  font-weight: ${({ theme: { header: { font: { weight } } } }): string => `${weight}`};
  color: ${({ theme: { header: { font: { color } } } }): string => `${color}`};

  font-family: inherit;
`;

export const RowStyled = styled.div<IStyledRow>`
  display: flex;
  background-color: ${({ theme: { rowColor } }): string => rowColor};

  :nth-child(2n) {
    background-color: ${({ isSelected, theme: { evenRowColor } }): string => (isSelected ? 'none' : evenRowColor)}
  };
  background-color: ${({ isSelected, theme: { activeRowColor } }): string => (isSelected ? activeRowColor : 'none')};
`;

export const TableStyled = styled.div`
  display: table;
`;


export const TableHead = styled.div<ITableTheme>`
  display: flex;
  border-bottom: ${({ theme: { headBorderBottom: { width, color, style } } }): string => `${width} ${color} ${style}`};
`;

export const TableWrapper = styled.div`
  height: calc(100% - 25px);
  width: calc(100% - 0px);
  overflow: scroll;

  ::-webkit-scrollbar { width: 10px; height: 10px;};
  ::-webkit-scrollbar-button {  background-color: #FFF; width: 0px; height: 0px;}
  ::-webkit-scrollbar-track {  background-color: #999;}
  ::-webkit-scrollbar-track-piece { background-color: #fff;}
  ::-webkit-scrollbar-track-piece:hover { background-color: #eee;}
  ::-webkit-scrollbar-thumb { height: 150px; background-color: #ccc; border-radius: 3px}
  ::-webkit-scrollbar-thumb:hover { background-color: #888;}
  ::-webkit-scrollbar-corner { background-color: #FFF;}
  ::-webkit-resizer { background-color: #666;}

  scrollbar-width: thin;
  scrollbar-color: #ccc;
`;

export const ContentWrapper = styled.div<ITableTheme>`
  overflow: hidden;
  height: ${({ theme: { height } }): string => height};
  width: ${({ theme: { width } }): string => width};
  max-height: 100%;
`;

export const HeadWrapper = styled.div`
  display: table;
`;
