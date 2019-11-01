import styled from 'styled-components';
import {
  ITableTheme,
  IStyledRow,
  IStyledCell,
  IStyledHead,
  IRowShift,
  ITableData,
} from './interfaces';


const getBorder = (borderName: string) => ({
  theme:
  {
    [borderName]:
    {
      width,
      color,
      style,
    },
  },
}: any): string => `${width} ${color} ${style}`;

const getPadding = ({
  theme: {
    padding: {
      top,
      right,
      bottom,
      left,
    },
  },
}:
{theme: {padding:
{
  top: string;
  right: string;
  bottom: string;
  left: string;}; };}): string => `${top} ${right} ${bottom} ${left}`;

export const StyledCell = styled.div<IStyledCell>`
   padding: ${getPadding};
  overflow: hidden;
  box-sizing: border-box;
  font-size: ${({ theme: { font: { size } } }): string => `${size}`};
  font-weight: ${({ theme: { font: { weight } } }): string => `${weight}`};
  color: ${({ theme: { font: { color } } }): string => `${color}`};
  border-right: ${getBorder('borderRight')};
  width: ${({ width }): string => `${width}px`};
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
`;


export const HeaderStyled = styled.div<IStyledHead>`
   padding: ${getPadding};
  width: ${({ width }): string => `${width}px`};
  text-align: left;
  font-family: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  background-color: ${({ theme: { backgroundColor } }): string => backgroundColor};
  :hover {
    background-color: ${({ theme: { hoverColor } }): string => hoverColor};
  }
  font-size: ${({ theme: { font: { size } } }): string => `${size}`};
  font-weight: ${({ theme: { font: { weight } } }): string => `${weight}`};
  color: ${({ theme: { font: { color } } }): string => `${color}`};
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
  border-bottom: ${getBorder('headBorderBottom')};
`;

export const TableWrapper = styled.div`
  height: calc(100% - 25px);
  overflow: auto;

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

export const ToggleButton = styled.button`
  background-color: rgba(0,0,0,0);
  outline: none;
  border: none;
  display: flex;
  align-items: center;
`;

export const RowShift = styled.div<IRowShift>`
  width: ${({ width }) => width};
  height: 1px;
  float: left;
  background-color: rgba(0,0,0,0);
  ${({ backgroundColor }) => `background-color: ${backgroundColor}`};
  flex-shrink: 0;
  `;

export const TableDataStyled = styled.span<ITableData>`
    overflow: hidden;
    text-overflow: ${({ theme: { textOverflow } }) => textOverflow};
    white-space: ${({ multiline }) => (multiline ? '' : 'nowrap')};
  `;
