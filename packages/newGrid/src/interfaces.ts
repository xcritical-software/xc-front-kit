import { ReactElement } from 'react';


export interface IItem {
  [key: string]: string | number | ReactElement | any /* сделать что то с этим */;
}
export interface IColumn {
  headerName: string;
  field: string;
  width: number;
  center?: boolean;
  isExpandable?: boolean;
}
export interface ITotals {
  [key: string]: string | number;
}
export interface IGrig {
  items: IItem[];
  columns: IColumn[];
  width: number;
  height: number;
  isDisableSelect?: boolean;
  isMultiSelect?: boolean;
  onChangeColumns?: Function;
  totals?: ITotals;
}
export interface IMappedItem extends IItem {
  key: string;
  expandLevel: number;
}

export interface IHeaderCellWrapper {
  text: string;
  width: number;
  onChangeWidth: Function;
  index: number;
  onMouseDown: Function;
  isEmpty: boolean;
  changeIsSelectable: Function;
  center: boolean;
}

export interface IHeaderWrapper {
  fullWidth: number;
  translateX: number;
  columns: IColumn[];
  onChangeWidth: Function;
  onChangeMoving: Function;
  changeIsSelectable: Function;
}

export type StrOrNum = string | number;

export interface IHeader {
  translateX: number;
  width: number;
}

export interface IHeaderCell {
  width: number;
}
export interface IHeaderCellContent {
  center: boolean;
  isEmpty?: boolean;
}
export interface ITotalCellContent {
  center: boolean;
}
export interface IRightBorder {
  isEmpty: boolean;
}
export interface IBodyCellContent {
  expandLevel: number;
  center: boolean;
}
export interface IBodyCellOffset {
  expandLevel: number;
}
export interface IWrapper {
  width: number;
  isSelectable: boolean;
}

export interface IMovingElem {
  mouseMove: number;
  center: boolean;
  startCoord: {
    x: number;
    y: number;
    height: number;
  };
}
