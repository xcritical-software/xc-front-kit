import { setIn } from 'utilitify';

import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { gridThemeNamespace, defaultTheme } from './theme';
import { IGridTheme, IMappedItem, IColumn, IItem } from './interfaces';
import { GridPositions } from './consts';

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}${
    s4() + s4()
  }-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const addOrDeleteItemFromArray = (array: string[], item: string) => {
  if (array.some((el: string) => el === item))
    return array.filter((el: string) => el !== item);

  return [...array, item];
};

export function gridTheme(
  theme: IThemeNamespace,
  propertyPath?: string | undefined
): IGridTheme {
  const func = getThemedState(gridThemeNamespace, defaultTheme);

  return func(theme, propertyPath) as IGridTheme;
}

export const getMappedItems = (items: IItem[]): IMappedItem[] =>
  items.map(
    (el: IItem): IMappedItem =>
      el.__key
        ? { __expandLevel: 0, ...el, __key: el.__key }
        : { __expandLevel: 0, ...el, __key: guid() }
  );

export const deleteSystemPropsFromObject = (
  item?: IMappedItem,
  saveKey: boolean = false
): IItem | undefined => {
  if (item) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { __key, __expandLevel, __isExpand, __parent, ...rest } = item;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return saveKey ? { __key, ...rest } : rest;
  }

  return undefined;
};

export const deleteSystemPropsFromObjects = (
  arr: IMappedItem[],
  saveKey: boolean = false
): IItem =>
  arr.map((el: IMappedItem) => deleteSystemPropsFromObject(el, saveKey));

export const searchLastVisible = (arr: IColumn[], idx: number) => {
  let lastVisible = 0;
  for (let i = idx - 1; i >= 0; i--) {
    if (arr[i].visible) {
      lastVisible = i;
      break;
    }
  }

  return lastVisible;
};
export const searchNextVisible = (arr: IColumn[], idx: number) => {
  let nextVisible = arr.length - 1;
  for (let i = idx + 1; i < arr.length; i++) {
    if (arr[i].visible) {
      nextVisible = i;
      break;
    }
  }

  return nextVisible;
};

export const getFullWidth = (
  columns: IColumn[],
  addScrollWidth: boolean = false
) =>
  columns
    .filter(({ visible }: IColumn) => visible)
    .reduce(
      (acc: number, { width: colWidth }) => acc + colWidth,
      addScrollWidth ? 10 : 0
    );

export const removeSorting = (columns) =>
  columns.map((el) => {
    if (el.sortable && el.sortOrder) {
      return {
        ...el,
        sortOrder: null,
      };
    }

    return el;
  });

export const changeGridSort = ({
  sortOrder,
  index,
  gridPosition,
  leftColumns,
  centerColumns,
  rightColumns,
  setLeftMappedColumns,
  setCenterMappedColumns,
  setRightMappedColumns,
}) => {
  if (gridPosition === GridPositions.LEFT) {
    const newLeftColumns = setIn(leftColumns, sortOrder, [index, 'sortOrder']);
    setLeftMappedColumns(newLeftColumns);
    setCenterMappedColumns(centerColumns);
    setRightMappedColumns(rightColumns);

    return [...newLeftColumns, ...centerColumns, ...rightColumns];
  }

  if (gridPosition === GridPositions.CENTER) {
    const newCenterColumns = setIn(centerColumns, sortOrder, [
      index,
      'sortOrder',
    ]);
    setLeftMappedColumns(leftColumns);
    setCenterMappedColumns(newCenterColumns);
    setRightMappedColumns(rightColumns);

    return [...leftColumns, ...newCenterColumns, ...rightColumns];
  }

  if (gridPosition === GridPositions.RIGHT) {
    const newRightColumns = setIn(rightColumns, sortOrder, [
      index,
      'sortOrder',
    ]);
    setLeftMappedColumns(leftColumns);
    setCenterMappedColumns(centerColumns);
    setRightMappedColumns(newRightColumns);

    return [...leftColumns, ...centerColumns, ...newRightColumns];
  }

  return [];
};
