import { css } from 'styled-components';
import memoize from 'memoizee';

import {
  getAppearanceTheme,
  getStatesTheme,
} from '@xcritical-old/xc-theme/utils';

import {
  inputThemeNamespace,
  inputThemeStyle,
} from '../theme';


export const inputTheme = (
  theme,
  appearanceName,
  baseAppearance,
  propertyPath,
) => {
  const func = getAppearanceTheme(inputThemeNamespace, inputThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

const getAppearanceStyleProperty = (theme, appearance, baseAppearance, stateName) => {
  const appearanceTheme = inputTheme(theme, appearance, baseAppearance);
  const statesTheme = getStatesTheme(appearanceTheme, stateName);
  return statesTheme();
};

export const getBackgroundStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}, elementName) => {
  const element = inputTheme(theme, appearance, baseAppearance, elementName);

  const background = (element && element.background)
    || inputTheme(theme, appearance, baseAppearance, 'background');

  return css`
    background: ${background};
  `;
});

export const getColorStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}, elementName) => {
  const element = inputTheme(theme, appearance, baseAppearance, elementName);

  const color = (element && element.color)
    || inputTheme(theme, appearance, baseAppearance, 'color');

  return css`
    color: ${color};
  `;
});

export const getPaddingStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
  isRTL,
  isDivided,
  hasPrefix,
  hasSuffix,
}, elementName) => {
  const {
    bottom = 0,
    left = 0,
    right = 0,
    top = 0,
  } = inputTheme(theme, appearance, baseAppearance, 'padding');

  const element = inputTheme(theme, appearance, baseAppearance, elementName);
  const commonBottom = (element && element.padding && element.padding.bottom !== undefined)
    ? element.padding.bottom
    : bottom;

  const commonLeft = (element && element.padding && element.padding.left !== undefined)
    ? element.padding.left
    : left;

  const commonRight = (element && element.padding && element.padding.right !== undefined)
    ? element.padding.right
    : right;

  const commonTop = (element && element.padding && element.padding.top !== undefined)
    ? element.padding.top
    : top;

  if (hasPrefix && hasSuffix) {
    return css`
      padding: ${commonTop}px ${isDivided ? right : 0}px ${commonBottom}px ${isDivided ? commonLeft : 0}px;
    `;
  }

  if (hasPrefix) {
    return isRTL
      ? css`
          padding: ${commonTop}px ${isDivided ? commonRight : 0}px ${commonBottom}px ${commonLeft}px;
        `
      : css`
          padding: ${commonTop}px ${commonRight}px ${commonBottom}px ${isDivided ? commonLeft : 0}px;
        `;
  }

  if (hasSuffix) {
    return isRTL
      ? css`
          padding: ${commonTop}px ${commonRight}px ${commonBottom}px ${isDivided ? commonLeft : 0}px;
        `
      : css`
          padding: ${commonTop}px ${isDivided ? commonRight : 0}px ${commonBottom}px ${commonLeft}px;
        `;
  }

  return css`
    padding: ${commonTop}px ${isRTL ? commonLeft : commonRight}px ${commonBottom}px ${isRTL ? commonRight : commonLeft}px;
  `;
});

export const getWidthStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}, elementName) => {
  const element = inputTheme(theme, appearance, baseAppearance, elementName);

  let finalWidth;
  let quantity;

  if (element && element.width) {
    finalWidth = element.width;
    quantity = typeof finalWidth === 'number' ? 'px' : '';
  } else {
    finalWidth = inputTheme(theme, appearance, baseAppearance, 'width');
    quantity = typeof finalWidth === 'number' ? 'px' : '';
  }

  return css`
    width: ${finalWidth}${quantity};
  `;
});

export const getHeightStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}, elementName) => {
  const element = inputTheme(theme, appearance, baseAppearance, elementName);

  let finalHeight;
  let quantity;

  if (element && element.height) {
    finalHeight = element.height;
    quantity = typeof finalHeight === 'number' ? 'px' : '';
  } else {
    finalHeight = inputTheme(theme, appearance, baseAppearance, 'height');
    quantity = typeof finalHeight === 'number' ? 'px' : '';
  }

  return css`
    height: ${finalHeight}${quantity};
  `;
});

export const getFontStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}, elementName) => {
  const {
    weight,
    size,
    lineHeightRatio,
  } = inputTheme(theme, appearance, baseAppearance, 'font');

  const element = inputTheme(theme, appearance, baseAppearance, elementName);

  const commonSize = (element && element.font && element.font.size !== undefined)
    ? element.font.size
    : size;

  return css`
    font-weight: ${(element && element.font && element.font.weight) || weight};
    font-size: ${commonSize}px;
    line-height: ${(element && element.font && element.font.lineHeightRatio !== undefined) ? commonSize * element.font.lineHeightRatio : commonSize * lineHeightRatio}px;
  `;
});

export const getBorderStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const {
    width,
    style,
    color,
  } = inputTheme(theme, appearance, baseAppearance, 'border');

  return css`
    border: ${width}px ${style} ${color};
  `;
});

export const getBorderRadiusStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
  isRTL,
  hasPrefix,
  hasSuffix,
}) => {
  const {
    topLeft = 0,
    topRight = 0,
    bottomRight = 0,
    bottomLeft = 0,
  } = inputTheme(theme, appearance, baseAppearance, 'borderRadius');

  if (hasPrefix && hasSuffix) {
    return css`
      border-radius: 0;
    `;
  }

  if (hasPrefix) {
    return css`
      border-top-left-radius: ${isRTL ? topLeft : 0}px;
      border-top-right-radius: ${isRTL ? 0 : topRight}px;
      border-bottom-right-radius: ${isRTL ? 0 : bottomRight}px;
      border-bottom-left-radius: ${isRTL ? bottomLeft : 0}px;
    `;
  }

  if (hasSuffix) {
    return css`
      border-top-left-radius: ${isRTL ? 0 : topLeft}px;
      border-top-right-radius: ${isRTL ? topRight : 0}px;
      border-bottom-right-radius: ${isRTL ? bottomRight : 0}px;
      border-bottom-left-radius: ${isRTL ? 0 : bottomLeft}px;
    `;
  }

  return css`
    border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;
  `;
});

export const getTransitionStyle = memoize(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const {
    property,
    duration,
    timingFunction,
    delay,
  } = inputTheme(theme, appearance, baseAppearance, 'transition');

  return css`
    transition-property: ${property};
    transition-duration: ${duration};
    transition-timing-function: ${timingFunction};
    transition-delay: ${delay};
  `;
});

const getFontAppearanceStyle = memoize((font = {}) => {
  const { weight, size, lineHeightRatio } = font;

  return css`
    ${weight && `font-weight: ${weight}`};
    ${size && `font-size: ${size}px`};
    ${lineHeightRatio && `line-height: ${size * lineHeightRatio}px`}
  `;
});

const getBorderRadiusAppearanceStyle = memoize((borderRadius = {}) => {
  const {
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  } = borderRadius;

  return css`
    ${topLeft && `border-top-left-radius: ${topLeft}px`};
    ${topRight && `border-top-right-radius: ${topRight}px`};
    ${bottomRight && `border-bottom-right-radius: ${bottomRight}px`};
    ${bottomLeft && `border-bottom-left-radius: ${bottomLeft}px`};
  `;
});

const getBorderAppearanceStyle = memoize((border = {}) => {
  const {
    width,
    style,
    color,
  } = border;

  return css`
    ${width && `border-width: ${width}px`};
    ${style && `border-style: ${style}`};
    ${color && `border-color: ${color}`};
  `;
});

const getTransitionAppearanceStyle = memoize((transition = {}) => {
  const {
    property,
    duration,
    timingFunction,
    delay,
  } = transition;

  return css`
    ${property && `transition-property: ${property}`};
    ${duration && `transition-duration: ${duration}`};
    ${timingFunction && `transition-timing-function: ${timingFunction}`};
    ${delay && `transition-delay: ${delay}`};
  `;
});

export const getRootInputStatesStyle = memoize((stateName) => ({
  theme,
  baseAppearance,
  appearance,
}) => {
  const {
    background,
    height,
    border,
    borderRadius,
    transition,
  } = getAppearanceStyleProperty(theme, appearance, baseAppearance, stateName);

  return css`
    ${background && `background: ${background}`};
    ${height && `height: ${height}px`};
    ${getBorderRadiusAppearanceStyle(borderRadius)}
    ${getBorderAppearanceStyle(border)}
    ${getTransitionAppearanceStyle(transition)}
  `;
});

export const getRootInputInteractiveStyles = memoize(({
  theme,
  appearance,
  baseAppearance,
  disabled,
  selected,
  invalid,
}) => {
  const boxShadowColor = inputTheme(theme, appearance, baseAppearance, ['boxShadowColor']);

  const standartFocus = css`
    &:focus {
      box-shadow: 1px 1px 4px 0 ${boxShadowColor};
    }
  `;

  const standartHover = css`
    &:hover {
      box-shadow: 1px 1px 4px 0 ${boxShadowColor};
    }
  `;

  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.65;
      box-shadow: none;
      ${getRootInputStatesStyle('disabled')}

      ${standartHover}
      ${standartFocus};
    `;
  }

  if (selected) {
    return css`
      cursor: pointer;
      ${getRootInputStatesStyle('selected')}

      &:active {
        ${getRootInputStatesStyle('active')};
      }

      ${standartHover}
      ${standartFocus};
    `;
  }

  if (invalid) {
    return css`
      cursor: pointer;
      ${getRootInputStatesStyle('invalid')}

      &:active {
        ${getRootInputStatesStyle('active')};
      }

      ${standartHover}
      ${standartFocus};
    `;
  }

  return css`
    cursor: pointer;

    &:active {
      ${getRootInputStatesStyle('active')};
    }

    ${standartHover}
    ${standartFocus};
  `;
});

export const getInputStatesStyle = memoize((stateName) => ({
  theme,
  baseAppearance,
  appearance,
}) => {
  const {
    background,
    color,
    height,
    font,
    borderRadius,
  } = getAppearanceStyleProperty(theme, appearance, baseAppearance, stateName);

  return css`
    ${background && `background: ${background}`};
    ${color && `color: ${color}`};
    ${height && `height: ${height}px`};
    ${getFontAppearanceStyle(font)}
    ${getBorderRadiusAppearanceStyle(borderRadius)}
  `;
});

export const getInputInteractiveStyles = memoize(({
  disabled,
  selected,
  invalid,
}) => {
  if (disabled) {
    return css`
      cursor: not-allowed;
      opacity: 0.65;
      box-shadow: none;
      ${getRootInputStatesStyle('disabled')}

      &:active {
        background: inherit;
      }
    `;
  }

  if (selected) {
    return css`
      cursor: pointer;
      ${getInputStatesStyle('selected')}

      &:active {
        background: inherit;
      }
    `;
  }

  if (invalid) {
    return css`
      cursor: pointer;
      ${getInputStatesStyle('invalid')}

      &:active {
        background: inherit;
      }
    `;
  }

  return css`
    cursor: pointer;

    &:active {
      background: inherit;
    }
  `;
});

export const getPrefixSuffixStyles = memoize((propertyPath) => ({
  theme,
  appearance = 'default',
  baseAppearance = 'default',
  isRTL,
  isDivided,
}) => {
  const spacing = inputTheme(theme, appearance, baseAppearance, propertyPath);

  const {
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  } = inputTheme(theme, appearance, baseAppearance, 'borderRadius');

  const {
    width,
    style,
    color,
  } = inputTheme(theme, appearance, baseAppearance, 'border');

  const addonBackgroundColor = inputTheme(theme, appearance, baseAppearance, 'addonBackgroundColor');

  const styles = css`
    padding: 0 ${spacing}px;
    background-color: ${isDivided && addonBackgroundColor ? addonBackgroundColor : 'transparent'};
  `;

  const leftStyles = css`
    ${styles}
    border-radius: ${topLeft}px 0 0 ${bottomLeft}px;
    border-right: ${isDivided ? `${width}px ${style} ${color}` : 'none'};
  `;

  const rightStyles = css`
    ${styles}
    border-radius: 0 ${topRight}px ${bottomRight}px 0;
    border-left: ${isDivided ? `${width}px ${style} ${color}` : 'none'};
  `;

  const rtlStyles = propertyPath === 'prefixSpacing' ? rightStyles : leftStyles;

  const ltrStyles = propertyPath === 'prefixSpacing' ? leftStyles : rightStyles;

  return isRTL ? rtlStyles : ltrStyles;
});
