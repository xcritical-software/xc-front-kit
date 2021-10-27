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
  borderRadius: 3,
  headerCellBorder: `1px solid ${colors.BLACK_RAISIN}`,
  totalsCellBorder: 'none',
  rowCellBorder: 'none',
  emptyHeaderCellBackground: colors.GRAY_LIGHT,
  movingHeaderCellBackgroungColor: colors.SECONDARY,
  movingHeaderCellColor: colors.WHITE,
  expandButtonMargin: '7px',
  header: {
    border: `1px solid ${colors.GRAY}`,
    fontSize: '11px',
    backgroundColor: colors.GRAY,
    height: 25,
    padding: '5px',
    overflow: 'initial',
  },
  row: {
    padding: '5px',
    height: 20,
    fontSize: '11px',
    border: `1px solid ${colors.GRAY}`,
    fontWeight: 'normal',
    backgroundColor: 'white',
  },
  totals: {
    border: 'none',
    padding: '5px',
    fontSize: '11px',
    backgroundColor: colors.GRAY,
    height: 30,
  },
};
