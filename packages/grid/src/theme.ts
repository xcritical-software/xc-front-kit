import { colors } from '@xcritical/theme';
import { IGridTheme } from './interfaces';


export const gridThemeNamespace = '@xcritical\\grid';

export const defaultTheme: IGridTheme = {
  evenRowBackground: colors.GRAY_LIGHT,
  selectedRowColor: colors.SECONDARY,
  offsetExpand: 20,
  border: `1px solid ${colors.GRAY}`,
  borderRadius: 5,
  headerCellBorder: `1px solid ${colors.GRAY}`,
  totalsCellBorder: `1px solid ${colors.GRAY}`,
  rowCellBorder: `1px solid ${colors.GRAY}`,
  emptyHeaderCellBackgroung: 'pink',
  movingHeaderCellBackgroung: colors.SECONDARY,
  header: {
    border: `1px solid ${colors.GRAY}`,
    fontSize: '16px',
    color: 'black',
    backgroundColor: colors.GRAY,
    height: 30,
    padding: 5,
  },
  row: {
    border: `1px solid ${colors.GRAY}`,
    padding: 12,
    fontSize: '14px',
    color: 'black',
    backgroundColor: 'white',
  },
  totals: {
    border: '1px solid black',
    padding: 30,
    fontSize: '16px',
    color: 'black',
    backgroundColor: colors.GRAY,
    height: 30,
  },
};
