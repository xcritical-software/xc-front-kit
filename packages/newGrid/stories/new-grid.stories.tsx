import * as React from "react";
import { storiesOf } from "@storybook/react";
// import { ThemeProvider } from 'styled-components';
// import { darken, mix } from 'polished';
// import { action } from '@storybook/addon-actions';
import Grid from "../src/Grid";
import { IColumn } from "../src/interfaces";
import "./style.css";
import { columns, totals, rowsWithChildren, rows } from "./data";
import * as countries from "./countries";
// import { gridThemeNamespace } from "../src/theme";

// const theme = {
//   [gridThemeNamespace]: {
//     evenRowBackground: "red",
//     selectedRowColor: "yellow",
//     offsetExpand: "30",
//     totalsCellBorder: "1px solid red",
//     header: {
//       border: "1px solid green"
//     },
//     totals: {
//       border: "3px solid yellow",
//       padding: "10px",
//       fontSize: "20px",
//       fontWeight: 600,
//       color: "white",
//       backgroundColor: "black"
//     }
//   }
// };

storiesOf("New Grid", module)
  .add("Basic", () => (
    <Grid
      columns={columns}
      items={rows}
      totals={totals}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
      // theme={theme}
    />
  ))
  .add("With childrens", () => (
    <Grid
      columns={columns}
      items={rowsWithChildren}
      totals={totals}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
    />
  ))
  .add("Handler change columns (see consol)", () => (
    <Grid
      columns={columns}
      items={rowsWithChildren}
      totals={totals}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
      onChangeColumns={(columns: IColumn) => console.log(columns)}
    />
  ))
  .add("Group", () => (
    <Grid
      columns={countries.columns}
      items={countries.items}
      totals={totals}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
    />
  ));
