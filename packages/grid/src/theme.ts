import { colors } from '@xcritical/theme';

import { IGridTheme } from './interfaces';

export const gridThemeNamespace = '@xcritical\\grid';

export const defaultTheme: IGridTheme = {
  evenRowBackground: colors.GRAY_LIGHT,
  selectedRowBackgroundColor: colors.SECONDARY,
  selectedRowColor: colors.GRAY_LIGHT,
  offsetExpand: 20,
  sortIconSize: 16,
  border: `1px solid ${colors.GRAY}`,
  borderRadius: 5,
  totalsCellBorder: `1px solid ${colors.GRAY}`,
  rowCellBorder: `1px solid ${colors.GRAY}`,
  emptyHeaderCellBackground: colors.GRAY_LIGHT,
  movingHeaderCellBackgroungColor: colors.SECONDARY,
  movingHeaderCellColor: colors.WHITE,
  expandButtonMargin: '7px',
  header: {
    border: `none`,
    borderRight: `1px solid ${colors.GRAY}`,
    fontSize: '16px',
    color: 'black',
    backgroundColor: colors.GRAY,
    height: 30,
    padding: 0,
    overflow: 'initial',
  },
  headerCellContent: {
    fontSize: '16px',
    color: 'black',
    padding: '12px',
    overflow: 'hidden',
  },
  row: {
    border: `1px solid ${colors.GRAY}`,
    padding: '7px',
    fontSize: '14px',
    color: 'black',
    backgroundColor: 'white',
  },
  totals: {
    border: '1px solid black',
    padding: '12px',
    fontSize: '16px',
    color: 'black',
    backgroundColor: colors.GRAY,
    height: 30,
  },
};
