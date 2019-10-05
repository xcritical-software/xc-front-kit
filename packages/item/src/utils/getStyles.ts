import {
  getAppearanceTheme,
  getFontStyle,
  Theme,
} from '@xcritical/theme';
import { css } from 'styled-components';

import { itemThemeNamespace, itemThemeStyle } from '../theme';
import { IItemTheme, IItemProps } from '../interfaces';


export const itemTheme = (
  theme: Theme<IItemTheme>,
  appearanceName: string,
  baseAppearance: string,
  propertyPath: string | string[],
) => {
  const func = getAppearanceTheme(itemThemeNamespace, itemThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getPaddingStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  isRTL,
}: IItemProps) => {
  const {
    bottom = 0,
    left = 0,
    right = 0,
    top = 0,
  } = itemTheme(
    theme,
    appearance,
    baseAppearance,
    'padding',
  );

  return css`
    padding: ${top}px ${isRTL ? left : right}px ${bottom}px ${isRTL ? right : left}px;
  `;
};

export const getBaseStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IItemProps) => {
  const background: string = itemTheme(theme, appearance, baseAppearance, 'background');
  const color = itemTheme(theme, appearance, baseAppearance, 'color');
  const fontWeight = itemTheme(theme, appearance, baseAppearance, 'fontWeight');
  return css`
    background: ${background};
    color: ${color};
    fill: ${color};
    font-weight: ${fontWeight};
    &:focus {
      color: ${color};
    }
  `;
};

export const getHeightStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IItemProps) => {
  const height = itemTheme(theme, appearance, baseAppearance, 'height');
  return height
    ? css`
        height: ${height}px;
      `
    : '';
};

export const getItemStatesStyle = (stateName: string) => ({
  theme,
  baseAppearance = 'default',
  appearance = 'default',
}: IItemProps) => {
  const {
    background,
    color,
    fontWeight,
  } = itemTheme(theme, appearance, baseAppearance, stateName);
  return css`
    ${color && `color: ${color}`};
    ${color && `fill: ${color}`};
    ${background && `background: ${background}`};
    ${fontWeight && `font-weight: ${fontWeight}`};
    &:focus {
      color: inherit;
    }
  `;
};

export const getFontSize = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IItemProps) => {
  const {
    size = 0,
    weight = 0,
  } = itemTheme(
    theme, appearance, baseAppearance, 'font',
  );
  return getFontStyle({ size, weight });
};

export const getItemInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  disabled,
  selected,
}: IItemProps) => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px ${itemTheme(theme, appearance, baseAppearance, ['focus', 'outline'])} inset;
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      ${getItemStatesStyle('disabled')} 
      ${standardFocus};
    `;
  }

  if (selected) {
    return css`
      ${getItemStatesStyle('selected')} 
      &:hover {
        ${getItemStatesStyle('hover')};
      }

      &:active {
        ${getItemStatesStyle('active')};
      }

      ${standardFocus};
    `;
  }

  return css`
    &:hover {
      ${getItemStatesStyle('hover')};
    }

    &:active {
      ${getItemStatesStyle('active')};
    }

    ${standardFocus};
  `;
};
