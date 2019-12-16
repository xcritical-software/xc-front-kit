import range from 'lodash.range';
import { getThemedState, IThemeNamespace } from '@xcritical/theme';
import { selectThemeNamespace, ISelectBaseTheme } from '@xcritical/select';

import {
  buttonThemeNamespace,
  buttonGroupThemeNamespace,
  ButtonGroupTheme,
  ButtonTheme,
} from '@xcritical/button';

import { IPaginationTheme, IPageSizeOption } from './interfaces';
import { paginationThemeNamespace, defaultPaginationTheme } from './theme';


export const getPaginationStyles = (
  theme?: IThemeNamespace<IPaginationTheme>,
  propertyPath?: string[],
): any => {
  const func = getThemedState(paginationThemeNamespace, defaultPaginationTheme);
  return func(theme, propertyPath);
};

export const getPaginationButtonGroupTheme = (
  theme?: IThemeNamespace<IPaginationTheme>,
): IThemeNamespace<ButtonGroupTheme> => ({
  [buttonGroupThemeNamespace]: getPaginationStyles(theme, ['buttonGroup']),
});

export const getPaginationButtonTheme = (
  theme?: IThemeNamespace<IPaginationTheme>,
): IThemeNamespace<ButtonTheme> => ({
  [buttonThemeNamespace]: {
    appearance: {
      paginationButton: getPaginationStyles(theme, ['button']),
    },
  },
});

export const getPaginationSelectTheme = (
  theme?: IThemeNamespace<IPaginationTheme>,
): IThemeNamespace<ISelectBaseTheme> => ({
  [selectThemeNamespace]: {
    appearance: {
      paginationSelect: getPaginationStyles(theme, ['select']),
    },
  },
});

export const mapPageSizeOption = (pageSize: number): IPageSizeOption => ({
  value: pageSize,
  label: pageSize,
});

export const getVisiblePagesArray = (
  currentPage: number,
  totalPages: number,
  isAvailableVisibleRange: boolean,
  availableVisibleRange: number,
  availableVisibleRangeCenter: number,
): number[] => {
  if (isAvailableVisibleRange) {
    const isStartRange = currentPage <= availableVisibleRangeCenter;
    if (isStartRange) return range(2, 2 + availableVisibleRange);

    const isEndRange = currentPage + availableVisibleRangeCenter >= totalPages;
    if (isEndRange) return range(totalPages - availableVisibleRange, totalPages);

    const visiblePagesStart = currentPage - availableVisibleRangeCenter + 1;
    const visiblePagesEnd = visiblePagesStart + availableVisibleRange;

    return range(visiblePagesStart, visiblePagesEnd);
  }

  return range(2, 2 + availableVisibleRange);
};
