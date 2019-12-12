/* eslint-disable no-nested-ternary */
import get from 'lodash.get';
import memoize from 'micro-memoize';
import { css, FlattenInterpolation } from 'styled-components';

import {
  getAppearanceTheme,
  getThemedState,
  getStatesTheme,
  IThemeNamespace,
} from '@xcritical/theme';

import { buttonThemeNamespace, buttonThemeStyle } from '../theme';
import { ButtonTheme, IStyledButtonProps } from '../interfaces';


export const buttonTheme = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  propertyPath?: string | string[],
): ButtonTheme | any => {
  const func = getThemedState(buttonThemeNamespace, buttonThemeStyle);
  return func(theme, propertyPath);
});


export const buttonAppearanceTheme = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): ButtonTheme | any => {
  const func = getAppearanceTheme(buttonThemeNamespace, buttonThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
});


const getTransition = (state = 'default'): string => (state === 'hover'
  ? 'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)'
  : 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)');


const getCursor = (state = 'default'): string => (
  state === 'hover' || state === 'active' || state === 'selected'
    ? 'pointer'
    : state === 'disabled'
      ? 'not-allowed'
      : 'default'
);

const getAppearanceStyleProperty = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  baseAppearance: string,
  appearance: string,
  stateName: string,
  ghost: boolean,
): any => {
  const appearanceTheme: ButtonTheme = buttonAppearanceTheme(theme, appearance, baseAppearance);
  const statesTheme = getStatesTheme(appearanceTheme, stateName);

  if (ghost) {
    const outline = statesTheme('outline', {
      background: 'white',
      color: get(appearanceTheme, 'background'),
    });

    return {
      ...statesTheme(),
      ...outline,
    };
  }

  return statesTheme();
});


const getVerticalAlign = (spacing = 'default'): string => (spacing === 'none' ? 'baseline' : 'middle');

const getWidth = (shouldFitContent = false): string => (shouldFitContent ? '100%' : 'auto');


export const getButtonStatesStyle = (stateName: string) => ({
  theme,
  baseAppearance,
  appearance,
  ghost,
}: IStyledButtonProps): FlattenInterpolation<any> => {
  const {
    boxShadowColor,
    _outline,
    ...styles
  } = getAppearanceStyleProperty(
    theme,
    baseAppearance,
    appearance,
    stateName,
    ghost,
  );

  return css`
    ${styles}
    ${_outline}
    
    cursor: ${getCursor(stateName)};
    transition: ${getTransition(stateName)};

    &:focus {
      box-shadow: 0 0 0 2px ${boxShadowColor};
      text-decoration: none;
    }
  `;
};

export const getItemInteractiveStyles = memoize((
  disabled: boolean = false,
  selected: boolean = false,
  theme?: IThemeNamespace<ButtonTheme>,
  appearance: string = 'default',
  baseAppearance: string = 'default',
): FlattenInterpolation<any> => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px ${buttonAppearanceTheme(theme, appearance, baseAppearance, 'boxShadowColor')};
    }
  `;
  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.5;
      ${getButtonStatesStyle('disabled')}
    `;
  }

  if (selected) {
    return css`
      ${getButtonStatesStyle('selected')}

      &:hover {
        ${getButtonStatesStyle('hover')};
      }

      &:active {
        ${getButtonStatesStyle('active')};
      }
    `;
  }

  return css`
    &:hover {
      ${getButtonStatesStyle('hover')};
    }

    &:active {
      ${getButtonStatesStyle('active')};
    }
    ${standardFocus}
  `;
});

export const getButtonStyles = memoize((
  theme: IThemeNamespace<ButtonTheme>,
  baseAppearance: string,
  appearance: string,
  spacing: string,
  ghost: boolean,
  shouldFitContent: boolean,
): Record<string, any> => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appearance: _dontTouch, prefixSpacing, postfixSpacing, ...rootStyles
  } = buttonTheme(theme);

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    background, borderColor, outline, hover, active, disabled, selected, ...styles
  } = buttonAppearanceTheme(theme, appearance, baseAppearance);

  return {
    ...rootStyles,
    ...styles,
    background,
    fill: background,
    border: '1px solid transparent',
    borderColor: borderColor || 'transparent',
    cursor: getCursor(),
    transition: getTransition(),
    textAlign: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flex: 'none',
    height: 'auto',
    verticalAlign: getVerticalAlign(spacing),
    width: getWidth(shouldFitContent),
    ...ghost && (outline || {
      background: 'white',
      color: background,
    }),
  };
});
