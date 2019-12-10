import {
  getAppearanceTheme,
  getThemedState,
  ITheme,
  AllType,
} from '@xcritical/theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { blanketThemeNamespace, blanketThemeStyle } from '../theme';
import { IBlanketTheme, IBlanketProps } from '../interfaces';


export const blanketTheme = (
  theme: ITheme<IBlanketTheme>,
  propertyPath?: string | string[],
): AllType => {
  const func = getThemedState(blanketThemeNamespace, blanketThemeStyle);
  return func(theme, propertyPath);
};

export const blanketAppearanceTheme = (
  theme: ITheme<IBlanketTheme>,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): AllType => {
  const func = getAppearanceTheme(blanketThemeNamespace, blanketThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getBaseStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IBlanketProps): FlattenSimpleInterpolation => {
  const background: string = blanketAppearanceTheme(theme, appearance, baseAppearance, 'background');
  const color = blanketAppearanceTheme(theme, appearance, baseAppearance, 'color');
  const baseStyles = blanketTheme(theme);
  const styles = blanketAppearanceTheme(theme, appearance, baseAppearance);
  const zIndex = blanketAppearanceTheme(theme, appearance, baseAppearance, 'zIndex');

  return css`
    ${baseStyles}
    ${styles}
    background: ${background};
    color: ${color};
    z-index: ${zIndex};
  `;
};
