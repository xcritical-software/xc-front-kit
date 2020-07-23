import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';
import get from 'lodash.get';
import { mergeDeep } from 'utilitify';

import {
  getThemedState,
  ITheme,
  AllType,
} from '@xcritical/theme';

import { blanketThemeNamespace, defaultBlanketTheme } from './theme';
import { IBlanketTheme, IBlanketProps } from './interfaces';


export const blanketTheme = (
  theme: ITheme<IBlanketTheme>,
  propertyPath?: string | string[],
): AllType => {
  const func = getThemedState(blanketThemeNamespace, defaultBlanketTheme);

  return func(theme, propertyPath);
};

export const getBlanketThemeStylesByProperty = (
  { theme }: ITheme<IBlanketTheme>,
) => (propertyPath: string[]): CSSObject => {
  const customBlanketTheme = get(theme, blanketThemeNamespace);
  const mergedTheme = mergeDeep(defaultBlanketTheme, customBlanketTheme);

  return get(mergedTheme, propertyPath);
};

export const getBaseStyle = ({ theme }: IBlanketProps): FlattenSimpleInterpolation => {
  const baseStyles = blanketTheme(theme);

  return css`
    ${baseStyles}
  `;
};
