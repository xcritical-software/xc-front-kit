/* eslint-disable no-nested-ternary */
import get from 'lodash.get';
import {
  css,
  FlattenInterpolation,
} from 'styled-components';

import {
  getAppearanceTheme,
  getFontStyle,
  getStatesTheme,
  IThemeNamespace,
} from '@xcritical/theme';

import {
  buttonThemeNamespace,
  buttonThemeStyle,
  staticStyles,
} from '../theme';
import {
  IButtonProps, IButtonTheme, ButtonTheme, IShouldFitContent, ISpacing,
} from '../interfaces';


export const buttonTheme = (
  theme: IThemeNamespace<IButtonTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): IButtonTheme | any => {
  const func = getAppearanceTheme(buttonThemeNamespace, buttonThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getPaddingStyle = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  isRTL,
}: IButtonProps): FlattenInterpolation<any> => {
  const {
    bottom = 0,
    left = 0,
    right = 0,
    top = 0,
  } = buttonTheme(
    theme, appearance, baseAppearance, 'padding',
  );

  return css`
    padding: ${top}px ${isRTL ? left : right}px ${bottom}px ${isRTL ? right : left}px;
  `;
};

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

const getApperanceStyleProperty = (
  theme: IThemeNamespace<ButtonTheme> = {},
  appearance: string,
  baseAppearance: string,
  stateName: string,
  outlineEnable: boolean,
): any => {
  const appearanceTheme: IButtonTheme = buttonTheme(theme, appearance, baseAppearance);
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
};

export const getFontSize = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IButtonProps): FlattenInterpolation<any> => {
  const {
    size = 0,
    weight = 0,
  } = buttonTheme(
    theme,
    appearance,
    baseAppearance,
    'font',
  );
  return getFontStyle({
    size,
    weight,
  });
};

export const getFocusSize = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
}: IButtonProps): FlattenInterpolation<any> => {
  const {
    size = 0,
    weight = 0,
  } = buttonTheme(
    theme,
    appearance,
    baseAppearance,
    'font',
  );
  return getFontStyle({
    size,
    weight,
  });
};


const getVerticalAlign = ({
  spacing = 'default',
}: ISpacing): string => (spacing === 'none' ? 'baseline' : 'middle');

const getWidth = ({
  shouldFitContent,
}: IShouldFitContent): string => (shouldFitContent ? '100%' : 'auto');

const getBorderRadius = (
  appearance = 'default',
  baseAppearance = 'default',
  theme?: IThemeNamespace<ButtonTheme>,
): string => buttonTheme(
  theme, appearance, baseAppearance, 'borderRadius',
);

export const getButtonStatesStyle = (stateName: string) => ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  outline,
}: IButtonProps): FlattenInterpolation<any> => {
  const {
    background,
    color,
    boxShadowColor,
    font,
    borderColor,
  } = getApperanceStyleProperty(
    theme,
    appearance,
    baseAppearance,
    stateName,
    outline || false,
  );

  return css`
    ${color && `color: ${color}`};
    ${background && `fill: ${background}`};
    ${background && `background: ${background}`};
    ${borderColor && `border-color: ${borderColor}`};
    ${font ? getFontStyle(font) : null}
    cursor: ${getCursor(stateName)};
    transition: ${getTransition(stateName)};

    &:focus {
      box-shadow: 0 0 0 2px ${boxShadowColor};
      text-decoration: none;
    }
  `;
};

export const getItemInteractiveStyles = ({
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
};

export const getButtonStyles = ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  outline: outlineEnable,
  ...props
}: IButtonProps): Record<string, any> => {
  const background = buttonTheme(theme, appearance, baseAppearance, 'background');
  const color = buttonTheme(theme, appearance, baseAppearance, 'color');
  const borderColor = buttonTheme(theme, appearance, baseAppearance, 'borderColor');
  const outline = buttonTheme(theme, appearance, baseAppearance, 'outline');

  return {
    ...staticStyles,
    background,
    color,
    fill: background,
    border: '1px solid transparent',
    borderColor: borderColor || 'transparent',
    cursor: getCursor(),
    transition: getTransition(),
    borderRadius: `${getBorderRadius(
      appearance,
      baseAppearance,
      theme,
    )}px`,
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
};
