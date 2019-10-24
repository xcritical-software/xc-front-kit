import memoizee from 'memoizee';

import { getAppearanceTheme, getStatesTheme, isObject } from '@xcritical-old/xc-theme/utils';
import { selectThemeNamespace, selectThemeStyle } from '../theme';


export const selectTheme = (
  theme,
  appearanceName,
  baseAppearance,
  propertyPath,
) => {
  const func = getAppearanceTheme(selectThemeNamespace, selectThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

const getAppearanceStyleProperty = (theme, appearance, baseAppearance, stateName) => {
  const appearanceTheme = selectTheme(theme, appearance, baseAppearance);
  const statesTheme = getStatesTheme(appearanceTheme, stateName);
  return statesTheme();
};

export const getDisplayStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const display = selectTheme(theme, appearance, baseAppearance, 'display');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      display: (element && element.display) || display,
    };
  });
});

export const getPaddingStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const {
    bottom,
    left,
    right,
    top,
  } = selectTheme(theme, appearance, baseAppearance, 'padding');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      paddingLeft: element && element.padding && element.padding.left !== undefined
        ? element.padding.left
        : left,
      paddingRight: element && element.padding && element.padding.right !== undefined
        ? element.padding.right
        : right,
      paddingBottom: element && element.padding && element.padding.bottom !== undefined
        ? element.padding.bottom
        : bottom,
      paddingTop: element && element.padding && element.padding.top !== undefined
        ? element.padding.top
        : top,
    };
  });
});

export const getMarginStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const {
    bottom,
    left,
    right,
    top,
  } = selectTheme(theme, appearance, baseAppearance, 'margin');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      marginLeft: element && element.margin && element.margin.left !== undefined
        ? element.margin.left
        : left,
      marginRight: element && element.margin && element.margin.right !== undefined
        ? element.margin.right
        : right,
      marginBottom: element && element.margin && element.margin.bottom !== undefined
        ? element.margin.bottom
        : bottom,
      marginTop: element && element.margin && element.margin.top !== undefined
        ? element.margin.top
        : top,
    };
  });
});

export const getFontStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const {
    size,
    weight,
  } = selectTheme(theme, appearance, baseAppearance, 'font');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      fontSize: element && element.font && element.font.size !== undefined
        ? element.font.size
        : size,
      fontWeight: element && element.font && element.font.weight !== undefined
        ? element.font.weight
        : weight,
    };
  });
});

export const getBorderStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const {
    width,
    style,
    color,
  } = selectTheme(theme, appearance, baseAppearance, 'border');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      borderWidth: element && element.border && element.border.width !== undefined
        ? element.border.width
        : width,
      borderStyle: (element && element.border && element.border.style) || style,
      borderColor: (element && element.border && element.border.color) || color,
    };
  });
});

export const getWidthStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
  shouldFitContainer,
}) => {
  let width = selectTheme(theme, appearance, baseAppearance, 'width');

  if (!width) {
    width = 'auto';
  }

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      width: shouldFitContainer ? '100%' : ((element && element.width) || width),
    };
  });
});

export const getHeightStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  let height = selectTheme(theme, appearance, baseAppearance, 'height');

  if (!height) {
    height = 'auto';
  }

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      height: (element && element.height) || height,
    };
  });
});

export const getBorderRadiusStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const borderRadius = selectTheme(theme, appearance, baseAppearance, 'borderRadius');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    if (isObject(element.borderRadius)) {
      const isBorderRadiusObject = isObject(borderRadius);
      const topLeft = isBorderRadiusObject ? borderRadius.topLeft : borderRadius;
      const topRight = isBorderRadiusObject ? borderRadius.topRight : borderRadius;
      const bottomRight = isBorderRadiusObject ? borderRadius.bottomRight : borderRadius;
      const bottomLeft = isBorderRadiusObject ? borderRadius.bottomLeft : borderRadius;

      return {
        borderTopLeftRadius: (element && element.borderRadius
          && element.borderRadius.topLeft !== undefined)
          ? element.borderRadius.topLeft : topLeft,
        borderTopRightRadius: (element && element.borderRadius
          && element.borderRadius.topRight !== undefined)
          ? element.borderRadius.topRight : topRight,
        borderBottomRightRadius: (element && element.borderRadius
          && element.borderRadius.bottomRight !== undefined)
          ? element.borderRadius.bottomRight : bottomRight,
        borderBottomLeftRadius: (element && element.borderRadius
          && element.borderRadius.bottomLeft !== undefined)
          ? element.borderRadius.bottomLeft : bottomLeft,
      };
    }

    return {
      borderRadius: (element && element.borderRadius) || borderRadius,
    };
  });
});

export const getBackgroundStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  let background = selectTheme(theme, appearance, baseAppearance, 'background');

  if (!background) {
    background = 'transparent';
  }

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      background: (element && element.background) || background,
    };
  });
});

export const getColorStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  let color = selectTheme(theme, appearance, baseAppearance, 'color');

  if (!color) {
    color = 'inherit';
  }

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      color: (element && element.color) || color,
    };
  });
});

export const getCommonStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const background = selectTheme(theme, appearance, baseAppearance, 'background');
  const color = selectTheme(theme, appearance, baseAppearance, 'color');

  return memoizee(({
    elementName,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      background: (element && element.background) || background,
      color: (element && element.color) || color,
    };
  });
});

export const getStatesStyles = memoizee(({
  theme,
  appearance,
  baseAppearance,
}) => {
  const hoverStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'hover');
  const activeStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'active');
  const focusStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'focus');
  const selectedStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'selected');
  const disabledStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'disabled');

  return memoizee(({
    elementName,
    isDisabled,
    isFocused,
    isSelected,
  }) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    let elementStyles = {
      ':hover': {
        ...((element && element.hover) || hoverStyles),
      },
      ':active': {
        ...((element && element.active) || activeStyles),
      },
    };

    if (isDisabled) {
      elementStyles = {
        ...elementStyles,
        ...((element && element.disabled) || disabledStyles),
      };
    }

    if (isFocused) {
      elementStyles = {
        ...elementStyles,
        ...((element && element.focus) || focusStyles),
      };
    }

    if (isSelected) {
      elementStyles = {
        ...elementStyles,
        ...((element && element.selected) || selectedStyles),
      };
    }

    return elementStyles;
  });
});
