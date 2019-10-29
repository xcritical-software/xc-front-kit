import memoizee from 'memoizee';
import get from 'lodash.get';
import { getAppearanceTheme, getStatesTheme, IThemeNamespace } from '@xcritical/theme';
import { isObject } from 'utilitify';

import { selectThemeNamespace, selectThemeStyle } from '../theme';
import { SelectTheme, GetStyles, ISelectTheme } from '../interfaces';


export const selectTheme = (
  theme: IThemeNamespace<SelectTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): ISelectTheme | any => {
  const func = getAppearanceTheme(selectThemeNamespace, selectThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};

const getAppearanceStyleProperty = (
  theme: IThemeNamespace<SelectTheme> = {},
  appearance: string,
  baseAppearance: string,
  stateName: string,
): any => {
  const appearanceTheme = selectTheme(theme, appearance, baseAppearance);
  const statesTheme = getStatesTheme(appearanceTheme, stateName);
  return statesTheme();
};

export const getDisplayStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const display = selectTheme(theme, appearance, baseAppearance, ['display']);

  return memoizee((elementName) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      display: get(element, ['display'], display),
    };
  });
});

export const getPaddingStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const {
    bottom,
    left,
    right,
    top,
  } = selectTheme(theme, appearance, baseAppearance, ['padding']);

  return memoizee((elementName) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      paddingLeft: get(element, ['padding', 'left'], left),
      paddingRight: get(element, ['padding', 'right'], right),
      paddingBottom: get(element, ['padding', 'bottom'], bottom),
      paddingTop: get(element, ['padding', 'top'], top),
    };
  });
});

export const getMarginStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const {
    bottom,
    left,
    right,
    top,
  } = selectTheme(theme, appearance, baseAppearance, ['margin']);

  return memoizee((
    elementName,
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      marginLeft: get(element, ['margin', 'left'], left),
      marginRight: get(element, ['margin', 'right'], right),
      marginBottom: get(element, ['margin', 'bottom'], bottom),
      marginTop: get(element, ['margin', 'top'], top),
    };
  });
});

export const getFontStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const {
    size,
    weight,
  } = selectTheme(theme, appearance, baseAppearance, ['font']);

  return memoizee((
    elementName,
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      fontSize: get(element, ['font', 'size'], size),
      fontWeight: get(element, ['font', 'weight'], weight),
    };
  });
});

export const getBorderStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const {
    width,
    style,
    color,
  } = selectTheme(theme, appearance, baseAppearance, ['border']);

  return memoizee((
    elementName,
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      borderWidth: get(element, ['border', 'width'], width),
      borderStyle: get(element, ['border', 'style'], style),
      borderColor: get(element, ['border', 'color'], color),
    };
  });
});

export const getWidthStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let width = selectTheme(theme, appearance, baseAppearance, ['width']);

  if (!width) {
    width = 'auto';
  }

  return memoizee((
    elementName,
    shouldFitContainer,
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      width: shouldFitContainer ? '100%' : get(element, ['width'], width),
    };
  });
});

export const getHeightStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let height = selectTheme(theme, appearance, baseAppearance, ['height']);

  if (!height) {
    height = 'auto';
  }

  return memoizee((
    elementName,
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      height: get(element, ['height'], height),
    };
  });
});

export const getBorderRadiusStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const borderRadius = selectTheme(theme, appearance, baseAppearance, ['borderRadius']);

  return memoizee((
    elementName,
  ) => {
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
      borderRadius: get(element, ['borderRadius'], borderRadius),
    };
  });
});

export const getBackgroundStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  let background = selectTheme(theme, appearance, baseAppearance, ['background']);

  if (!background) {
    background = 'transparent';
  }

  return memoizee((
    elementName,
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      background: (element && element.background) || background,
    };
  });
});

export const getCustomStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => memoizee((
  elementName,
  propertyPath,
) => {
  const propValue = selectTheme(theme, appearance, baseAppearance, [elementName, propertyPath]);

  return propValue;
}));

export const getCommonStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const background = selectTheme(theme, appearance, baseAppearance, 'background');
  const color = selectTheme(theme, appearance, baseAppearance, 'color');


  return memoizee((elementName) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);

    return {
      ...element,
      background: get(element, ['background'], background),
      color: get(element, ['color'], color),
      height: get(element, ['height']),
    };
  });
});

export const getStatesStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => {
  const hoverStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'hover');
  const activeStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'active');
  const focusStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'focus');
  const selectedStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'selected');
  const disabledStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'disabled');

  return memoizee((
    elementName,
    isDisabled,
    isFocused,
    isSelected,
  ) => {
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
