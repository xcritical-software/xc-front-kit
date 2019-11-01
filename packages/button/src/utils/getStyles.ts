/* eslint-disable no-nested-ternary */
import get from 'lodash.get';
import memoize from 'memoizee';
import {
  css,
  FlattenInterpolation,
} from 'styled-components';

import {
  getAppearanceTheme,
  getStatesTheme,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  buttonThemeNamespace,
  buttonThemeStyle,
  staticStyles,
} from '../theme';
import {
  IButtonProps, ButtonTheme, IShouldFitContent, ISpacing,
} from '../interfaces';


export const buttonTheme = memoize((
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

const getApperanceStyleProperty = memoize((
  theme: IThemeNamespace<ButtonTheme> = {},
  appearance: string,
  baseAppearance: string,
  stateName: string,
  outlineEnable: boolean,
): any => {
  const appearanceTheme: ButtonTheme = buttonTheme(theme, appearance, baseAppearance);
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
});


const getVerticalAlign = ({
  spacing = 'default',
}: ISpacing): string => (spacing === 'none' ? 'baseline' : 'middle');

const getWidth = ({
  shouldFitContent,
}: IShouldFitContent): string => (shouldFitContent ? '100%' : 'auto');


export const getButtonStatesStyle = (stateName: string) => ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  outline,
}: IButtonProps): FlattenInterpolation<any> => {
  const {
    boxShadowColor,
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
    cursor: ${getCursor(stateName)};
    transition: ${getTransition(stateName)};

    &:focus {
      box-shadow: 0 0 0 2px ${boxShadowColor};
      text-decoration: none;
    }
  `;
};

export const getItemInteractiveStyles = memoize(({
  disabled,
  selected,
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IButtonProps): FlattenInterpolation<any> => {
  const standardFocus = css`
    &:focus {
      box-shadow: 0 0 0 2px ${buttonTheme(theme, appearance, baseAppearance, 'boxShadowColor')};
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

export const getButtonStyles = memoize(({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  outline: outlineEnable,
  ...props
}: IButtonProps): Record<string, any> => {
  const {
    background, styles, borderColor, outline,
  } = buttonTheme(theme, appearance, baseAppearance);

  return {
    ...staticStyles,
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
    verticalAlign: getVerticalAlign(props),
    width: getWidth(props),
    ...outlineEnable && (outline || {
      background: 'white',
      color: background,
    }),
  };
});
