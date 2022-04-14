import { css, FlattenInterpolation } from 'styled-components';

import { AllType, getAppearanceTheme } from '@xcritical/theme';

import { checkboxThemeNamespace, defaultCheckboxTheme } from '../theme';
import { CheckboxTheme, IStyledCheckboxProps } from '../interfaces';

export const checkboxAppearanceTheme = (
  theme: CheckboxTheme,
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[]
): AllType => {
  const func = getAppearanceTheme(checkboxThemeNamespace, defaultCheckboxTheme);

  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getCheckboxInteractiveStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  disabled,
}: IStyledCheckboxProps): FlattenInterpolation<any> => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px
        ${checkboxAppearanceTheme(theme, appearance, baseAppearance, [
          'focus',
          'outline',
        ])}
        inset;
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.5;
      ${checkboxAppearanceTheme(theme, appearance, baseAppearance, 'disabled')}
      ${standardFocus};
    `;
  }

  return css`
    &:hover {
      ${checkboxAppearanceTheme(theme, appearance, baseAppearance, 'hover')};
    }

    &:active {
      ${checkboxAppearanceTheme(theme, appearance, baseAppearance, 'active')};
    }

    ${standardFocus};
  `;
};
