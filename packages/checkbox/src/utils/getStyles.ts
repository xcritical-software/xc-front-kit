import { css, FlattenInterpolation } from 'styled-components';


import { getThemedState, AllType, getAppearanceTheme } from '@xcritical/theme';

import { checkboxThemeNamespace, defaultCheckboxTheme } from '../theme';
import { CheckboxTheme, ICheckboxProps } from '../interfaces';


export const checkboxTheme = (
  theme: CheckboxTheme,
  propertyPath?: string | string[],
): AllType => {
  const func = getThemedState(checkboxThemeNamespace, defaultCheckboxTheme);
  return func(theme, propertyPath);
};

export const checkboxAppearanceTheme = (
  theme: CheckboxTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): AllType => {
  const func = getAppearanceTheme(checkboxThemeNamespace, defaultCheckboxTheme);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getCheckboxStatesStyle = (stateName: string) => ({
  theme,
  baseAppearance = 'default',
  appearance = 'default',
}: ICheckboxProps): FlattenInterpolation<any> => {
  const styles = checkboxAppearanceTheme(theme, appearance, baseAppearance, stateName);

  return css`
    ${styles}

    &:focus {
      color: inherit;
    }
  `;
};

export const getCheckboxInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  disabled,
}: ICheckboxProps): FlattenInterpolation<any> => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px ${checkboxAppearanceTheme(theme, appearance, baseAppearance, ['focus', 'outline'])} inset;
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      ${getCheckboxStatesStyle('disabled')}
      ${standardFocus};
    `;
  }

  return css`
    &:hover {
      ${getCheckboxStatesStyle('hover')};
    }

    &:active {
      ${getCheckboxStatesStyle('active')};
    }

    ${standardFocus};
  `;
};
