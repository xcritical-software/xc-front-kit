// import { colors } from "@xcritical/theme";
import { IGridTheme } from './interfaces';


export const gridThemeNamespace = '@xcritical\\grid';

export const defaultTheme: IGridTheme = {
  evenRowBackground: '#affac3',
  selectedRowColor: '#10c942',
  offsetExpand: 20,
  border: '1px solid black',
  borderRadius: '5px',
  headerCellBorder: '1px solid black',
  totalsCellBorder: '1px solid black',
  rowCellBorder: 'none',
  emptyHeaderCellBackgroung: 'pink',
  movingHeaderCellBackgroung: 'orange',
  header: {
    border: '1px solid black',
    fontSize: '16px',
    color: 'black',
    backgroundColor: 'yellow',
    height: '60px',
    padding: '10px',
  },
  row: {
    border: '1px solid black',
    padding: '12px',
    fontSize: '14px',
    color: 'black',
    backgroundColor: 'white',
  },
  totals: {
    border: '1px solid black',
    padding: '30px',
    fontSize: '12px',
    color: 'black',
    backgroundColor: 'lightblue',
    height: '30px',
  },
};
