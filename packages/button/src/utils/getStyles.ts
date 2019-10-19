import get from 'lodash.get';
import {
  css,
} from 'styled-components';

import {
  getAppearanceTheme,
  getFontStyle,
  getStatesTheme,
} from '@xcritical/theme';
import {
  buttonThemeNamespace,
  buttonThemeStyle,
  staticStyles,
} from '../theme';


export const buttonTheme = (
  theme,
  appearanceName,
  baseAppearance,
  propertyPath,
) => {
  const func = getAppearanceTheme(buttonThemeNamespace, buttonThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

export const getPaddingStyle = ({
  theme,
  appearance,
  baseAppearance,
  isRTL,
}) => {
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

const getTransition = (state = 'default') => (state === 'hover'
  ? 'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)'
  : 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)');


const getCursor = (state = 'default') => (
  // eslint-disable-next-line no-nested-ternary
  state === 'hover' || state === 'active' || state === 'selected'
    ? 'pointer'
    : state === 'disabled'
      ? 'not-allowed'
      : 'default'
);

const getApperanceStyleProperty = (theme, appearance, baseAppearance, stateName, outlineEnable) => {
  const appearanceTheme = buttonTheme(theme, appearance, baseAppearance);
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
  appearance,
  baseAppearance,
}) => {
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
  appearance,
  baseAppearance,
}) => {
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
}) => (spacing === 'none' ? 'baseline' : 'middle');

const getWidth = ({
  shouldFitContent,
}) => (shouldFitContent ? '100%' : 'auto');

const getBorderRadius = ({
  appearance,
  baseAppearance,
  theme,
}) => buttonTheme(
  theme, appearance, baseAppearance, 'borderRadius',
);

export const getButtonStatesStyle = (stateName) => ({
  appearance,
  baseAppearance,
  theme,
  outline,
}) => {
  const {
    background,
    color,
    boxShadowColor,
    font,
    borderColor,
  } = getApperanceStyleProperty(theme, appearance, baseAppearance, stateName, outline);

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
  appearance,
  baseAppearance,
}) => {
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
  appearance,
  baseAppearance,
  outline: outlineEnable,
  ...props
}) => {
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
    borderRadius: `${getBorderRadius({
      theme, appearance, baseAppearance, ...props,
    })}px`,
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
