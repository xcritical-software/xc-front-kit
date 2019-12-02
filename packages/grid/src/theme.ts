// import { colors } from "@xcritical/theme";
import { IGridTheme } from './interfaces';


export const gridThemeNamespace = '@xcritical\\grid';

export const defaultTheme: IGridTheme = {
  evenRowBackground: '#affac3',
  selectedRowColor: '#10c942',
  offsetExpand: 20,
  border: '1px solid black',
  borderRadius: 5,
  headerCellBorder: '1px solid black',
  totalsCellBorder: '1px solid black',
  rowCellBorder: 'none',
  emptyHeaderCellBackgroung: 'pink',
  movingHeaderCellBackgroung: 'orange',
  header: {
    border: '1px solid black',
    fontSize: 16,
    color: 'black',
    backgroundColor: 'yellow',
    height: 60,
    padding: 10,
  },
  row: {
    border: '1px solid black',
    padding: 12,
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
  },
  totals: {
    border: '1px solid black',
    padding: 30,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'lightblue',
    height: 30,
  },
};
