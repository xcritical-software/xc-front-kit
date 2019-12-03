import { css } from 'styled-components';
import memoize from 'micro-memoize';

import {
  getAppearanceTheme,
  getThemedState,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  badgeThemeNamespace,
  badgeThemeStyle,
} from '../theme';
import {
  BadgeTheme,
} from '../interfaces';


const badgeTheme = memoize((
  theme: IThemeNamespace<BadgeTheme> = {},
  propertyPath?: string | string[],
): BadgeTheme | any => {
  const func = getThemedState(badgeThemeNamespace, badgeThemeStyle);
  return func(theme, propertyPath);
});


const badgeApperanceTheme = memoize((
  theme: IThemeNamespace<BadgeTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): BadgeTheme | any => {
  const func = getAppearanceTheme(badgeThemeNamespace, badgeThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
});

export const getRootBadgeStyles = memoize((
  theme: IThemeNamespace<BadgeTheme> = {},
  appearance: string,
  baseAppearance: string,
): any => ({
  ...badgeTheme(theme),
  ...badgeApperanceTheme(theme, appearance, baseAppearance),
}));

const getRootBadgeStatesStyle = memoize((
  theme: IThemeNamespace<BadgeTheme> = {},
  appearance: string,
  baseAppearance: string,
  stateName: string,
): any => badgeApperanceTheme(theme, appearance, baseAppearance, [stateName]));

export const getRootBadgeInteractiveStyles = memoize((
  theme: IThemeNamespace<BadgeTheme>,
  appearance: string,
  baseAppearance: string,
  inverse: boolean = false,
): any => {
  const standartFocus = css`
    &:focus {
      ${getRootBadgeStatesStyle(theme, appearance, baseAppearance, 'focus')}
    }
  `;

  const standartActive = css`
    &:active {
      ${getRootBadgeStatesStyle(theme, appearance, baseAppearance, 'active')};
    }
  `;

  const standartHover = css`
    &:hover {
      ${getRootBadgeStatesStyle(theme, appearance, baseAppearance, 'hover')}
    }
  `;

  if (inverse) {
    return css`
      ${getRootBadgeStatesStyle(theme, appearance, baseAppearance, 'inverse')}

      ${standartHover}
      ${standartFocus};
    `;
  }


  return css`
    ${standartActive}
    ${standartHover}
    ${standartFocus}
  `;
});

export const getBadgeStatesStyle = (stateName: string) => memoize((
  theme: IThemeNamespace<BadgeTheme> = {},
  appearance: string,
  baseAppearance: string,
): any => badgeApperanceTheme(theme, appearance || '', baseAppearance || '', [stateName]));
