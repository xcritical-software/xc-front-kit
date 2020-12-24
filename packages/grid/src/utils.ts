
import { setIn } from 'utilitify';

import { getThemedState, IThemeNamespace } from '@xcritical/theme';

import { gridThemeNamespace, defaultTheme } from './theme';
import {
  IGridTheme, IMappedItem, IColumn, IItem, IGridInfoItems,
} from './interfaces';
import { GridPositions } from './consts';


export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}${s4()
    + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const addOrDeleteItemFromArray = (array: string[], item: string) => {
  if (array.some((el: string) => el === item)) return array.filter((el: string) => el !== item);

  return [...array, item];
};

export function gridTheme(
  theme: IThemeNamespace,
  propertyPath?: string | undefined,
): IGridTheme {
  const func = getThemedState(gridThemeNamespace, defaultTheme);

  return func(theme, propertyPath) as IGridTheme;
}

export const deleteSystemPropsFromObject = (item?: IMappedItem): IItem | undefined => {
  if (item) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      __key,
      __expandLevel,
      __isExpand,
      __parent,
      ...rest
    } = item;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return rest;
  }

  return undefined;
};

export const deleteSystemPropsFromObjects = (arr: IMappedItem[]): IItem => arr
  .map((el: IMappedItem) => deleteSystemPropsFromObject(el));


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


export const getFullWidth = (columns: IColumn[]) => columns
  .filter(({ visible }: IColumn) => visible).reduce(
    (acc: number, { width: colWidth }) => (acc + colWidth), 0,
  );

export const removeSorting = (columns) => columns
  .map((el) => {
    if (el.sortable && el.sortOrder) {
      return {
        ...el, sortOrder: null,
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

    return [
      ...newLeftColumns,
      ...centerColumns,
      ...rightColumns,
    ];
  }

  if (gridPosition === GridPositions.CENTER) {
    const newCenterColumns = setIn(centerColumns, sortOrder, [index, 'sortOrder']);
    setLeftMappedColumns(leftColumns);
    setCenterMappedColumns(newCenterColumns);
    setRightMappedColumns(rightColumns);

    return [
      ...leftColumns,
      ...newCenterColumns,
      ...rightColumns,
    ];
  }

  if (gridPosition === GridPositions.RIGHT) {
    const newRightColumns = setIn(rightColumns, sortOrder, [index, 'sortOrder']);
    setLeftMappedColumns(leftColumns);
    setCenterMappedColumns(centerColumns);
    setRightMappedColumns(newRightColumns);

    return [
      ...leftColumns,
      ...centerColumns,
      ...newRightColumns,
    ];
  }

  return [];
};

export const mapGridInfoItems = (gridInfoItems: IGridInfoItems[]): IMappedItem[] => {
  const result: IMappedItem[] = [];
  gridInfoItems.forEach(({
    key, data, expandLevel, isExpand, children = undefined, parent = undefined,
  }) => {
    result.push({
      ...data,
      __expandLevel: expandLevel,
      __key: key,
      __isExpand: isExpand,
      __parent: parent,
    });

    if (children !== undefined && isExpand === true) {
      result.push(...mapGridInfoItems(children));
    }
  });

  return result;
};

export const getMappedChildrenWithGridInfo = (
  parent: IItem, level: number = 1,
): IGridInfoItems[] | undefined => {
  if (parent?.children.length > 0) {
    return parent.children.map((child) => ({
      expandLevel: level,
      data: child,
      key: guid(),
      parent,
      children: (child.children !== undefined)
        ? getMappedChildrenWithGridInfo(child, level + 1)
        : undefined,
    }));
  }

  return undefined;
};

export const getPathToGridInfoItemByKey = (
  technicalItems: IGridInfoItems[] | undefined,
  __key: string,
): string[] => {
  if (typeof technicalItems !== 'undefined') {
    for (let index = 0; index < technicalItems.length; index++) {
      if (technicalItems[index].key === __key) {
        return [String(index)];
      }

      const path = getPathToGridInfoItemByKey(technicalItems[index].children, __key);

      if (path.length > 0) {
        path.unshift('children');
        path.unshift(String(index));

        return path;
      }
    }
  }

  return [];
};
