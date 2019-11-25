/* eslint-disable no-nested-ternary */
import get from 'lodash.get';
import memoize from 'micro-memoize';
import { shallowEqual } from 'fast-equals';
import {
  css,
  FlattenInterpolation,
} from 'styled-components';

import {
  getAppearanceTheme,
  getThemedState,
  getStatesTheme,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  buttonThemeNamespace,
  buttonThemeStyle,
} from '../theme';
import {
  IButtonProps, ButtonTheme,
} from '../interfaces';


export const buttonTheme = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  propertyPath?: string | string[],
): ButtonTheme | any => {
  const func = getThemedState(buttonThemeNamespace, buttonThemeStyle);
  return func(theme, propertyPath);
}, {
  isEqual: shallowEqual,
});


export const buttonAppearanceTheme = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): ButtonTheme | any => {
  const func = getAppearanceTheme(buttonThemeNamespace, buttonThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
}, {
  isEqual: shallowEqual,
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

const getApperanceStyleProperty = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  appearance: string,
  baseAppearance: string,
  stateName: string,
  outlineEnable: boolean,
): any => {
  const appearanceTheme: ButtonTheme = buttonAppearanceTheme(theme, appearance, baseAppearance);
  const statesTheme = getStatesTheme(appearanceTheme, stateName);

  if (outlineEnable) {
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
}, {
  isEqual: shallowEqual,
});


const getVerticalAlign = (spacing = 'default'): string => (spacing === 'none' ? 'baseline' : 'middle');

const getWidth = (shouldFitContent = false): string => (shouldFitContent ? '100%' : 'auto');


const getButtonStatesStyle = (stateName: string) => ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  outline,
}: IButtonProps): FlattenInterpolation<any> => {
  const {
    boxShadowColor,
    _outline,
    ...styles
  } = getApperanceStyleProperty(
    theme,
    appearance,
    baseAppearance,
    stateName,
    outline || false,
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
}, {
  isEqual: shallowEqual,
});

export const getButtonStyles = memoize((
  theme: IThemeNamespace<ButtonTheme>,
  appearance: string = 'default',
  baseAppearance: string = 'default',
  outlineEnable?: any,
  shouldFitContent: boolean = false,
  spacing: string = 'default',
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
    ...outlineEnable && (outline || {
      background: 'white',
      color: background,
    }),
  };
}, {
  isEqual: shallowEqual,
});
