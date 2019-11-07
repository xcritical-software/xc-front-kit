import {
  getAppearanceTheme,
  getThemedState,
  ITheme,
  AllType,
} from '@xcritical/theme';
import { css, FlattenSimpleInterpolation, FlattenInterpolation } from 'styled-components';

import { itemThemeNamespace, itemThemeStyle } from '../theme';
import { IItemTheme, IItemProps } from '../interfaces';


export const itemTheme = (
  theme: ITheme<IItemTheme>,
  propertyPath?: string | string[],
): AllType => {
  const func = getThemedState(itemThemeNamespace, itemThemeStyle);
  return func(theme, propertyPath);
};

export const itemAppearanceTheme = (
  theme: ITheme<IItemTheme>,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): AllType => {
  const func = getAppearanceTheme(itemThemeNamespace, itemThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getBaseStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IItemProps): FlattenSimpleInterpolation => {
  const background: string = itemAppearanceTheme(theme, appearance, baseAppearance, 'background');
  const color = itemAppearanceTheme(theme, appearance, baseAppearance, 'color');
  const baseStyles = itemTheme(theme);
  const styles = itemAppearanceTheme(theme, appearance, baseAppearance);
  const fontWeight = itemAppearanceTheme(theme, appearance, baseAppearance, 'fontWeight');

  return css`
    ${baseStyles}
    ${styles}
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
}: IItemProps): FlattenSimpleInterpolation | string => {
  const height = itemAppearanceTheme(theme, appearance, baseAppearance, 'height');
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
}: IItemProps): FlattenInterpolation<any> => {
  const styles = itemAppearanceTheme(theme, appearance, baseAppearance, stateName);

  return css`
    ${styles}

    &:focus {
      color: inherit;
    }
  `;
};

export const getItemInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  disabled,
  selected,
}: IItemProps): FlattenInterpolation<any> => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px ${itemAppearanceTheme(theme, appearance, baseAppearance, ['focus', 'outline'])} inset;
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
