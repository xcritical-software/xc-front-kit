import * as React from "react";
import { storiesOf } from "@storybook/react";
// import { ThemeProvider } from 'styled-components';
// import { darken, mix } from 'polished';
// import { action } from '@storybook/addon-actions';
import Grid from "../src/Grid";
import { IColumn } from "../src/interfaces";

import { columns, totals, rowsWithChildren, rows } from "./data";
import * as countries from "./countries";

storiesOf("New Grid", module)
  .add("Basic", () => (
    <Grid
      columns={columns}
      items={rows}
      totals={totals}
      width={document.documentElement.clientWidth - 100}
      height={document.documentElement.clientHeight - 100}
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
