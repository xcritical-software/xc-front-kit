import styled from 'styled-components';

import { IThemeNamespace, colors } from '@xcritical/theme';

import { IGridTheme, gridThemeNamespace } from '../src';

export const Page = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px;
`;

export const GridWrapper = styled.div`
  flex: 1 1 0%;
  overflow: hidden;
  margin: 20px 0;
`;
export const SomeBlock = styled.div<{ height: number }>`
  width: 100px;
  height: ${({ height }) => `${height}px`};
  border: 1px solid green;
`;

export const SelectorColumnsWrapper = styled.div`
  display: flex;
`;

export const AMStheme: IThemeNamespace<IGridTheme> = {
  [gridThemeNamespace]: {
    evenRowBackground: colors.GRAY_LIGHT,
    selectedRowBackgroundColor: colors.BLACK_RAISIN,
    offsetExpand: 20,
    headerCellBorder: `1px solid ${colors.GRAY}`,
    totalsCellBorder: 'none',
    rowCellBorder: `1px solid ${colors.GRAY}`,
    header: {
      border: `1px solid ${colors.GRAY}`,
      fontSize: '14px',
      color: 'black',
      backgroundColor: 'white',
      height: 35,
    },
    row: {
      border: `1px solid ${colors.GRAY}`,
      padding: '5px 10px',
      fontSize: '13px',
    },
  },
};
