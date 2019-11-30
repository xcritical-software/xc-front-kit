// import { colors } from "@xcritical/theme";
import { IGridTheme } from "./interfaces";

export const gridThemeNamespace = "@xcritical\\grid";

export const defaultTheme: IGridTheme = {
  evenRowBackground: "#affac3",
  selectedRowColor: "#10c942",
  offsetExpand: "15",
  border: "1px solid black",
  headerCellBorder: "1px solid black",
  totalsCellBorder: "1px solid black",
  emptyHeaderCellBackgroung: "lightblue",
  movingHeaderCellBackgroung: "orange",
  header: {
    border: "1px solid black",
    fontSize: "16px",
    color: "rgb(115, 115, 115)",
    backgroundColor: "yellow",
    height: "60px",
    padding: "10px"
  },
  row: {
    border: "1px solid black",
    padding: "5px",
    fontSize: "16px",
    fontWeight: 400,
    color: "#000",
    backgroundColor: "white"
  },
  totals: {
    border: "1px solid black",
    padding: "10px",
    fontSize: "18px",
    color: "red",
    backgroundColor: "yellow",
    height: "30px"
  }
};
