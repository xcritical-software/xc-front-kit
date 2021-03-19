import memoizee from 'micro-memoize';
import get from 'lodash.get';

import { isObject } from 'utilitify';

import {
  getAppearanceTheme, getStatesTheme, IThemeNamespace,
} from '@xcritical/theme';

import { selectThemeNamespace, selectThemeStyle } from '../theme';
import { GetStyles, ISelectBaseTheme } from '../interfaces';


export const selectTheme = (
  theme: IThemeNamespace<ISelectBaseTheme> = {},
  appearanceName: string,
  baseAppearance: string,
  propertyPath?: string | string[],
): ISelectBaseTheme | any => {
  const func = getAppearanceTheme(selectThemeNamespace, selectThemeStyle);

  return func(theme, appearanceName, propertyPath, baseAppearance);
};

const getAppearanceStyleProperty = (
  theme: IThemeNamespace<ISelectBaseTheme> = {},
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
) => memoizee((elementName) => ({
  paddingLeft: selectTheme(theme, appearance, baseAppearance, [elementName, 'paddingLeft']),
  paddingRight: selectTheme(theme, appearance, baseAppearance, [elementName, 'paddingRight']),
  paddingBottom: selectTheme(theme, appearance, baseAppearance, [elementName, 'paddingBottom']),
  paddingTop: selectTheme(theme, appearance, baseAppearance, [elementName, 'paddingTop']),
})));

export const getMarginStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => memoizee((elementName) => ({
  marginLeft: selectTheme(theme, appearance, baseAppearance, [elementName, 'marginLeft']),
  marginRight: selectTheme(theme, appearance, baseAppearance, [elementName, 'marginRight']),
  marginBottom: selectTheme(theme, appearance, baseAppearance, [elementName, 'marginBottom']),
  marginTop: selectTheme(theme, appearance, baseAppearance, [elementName, 'marginTop']),
})));

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
    { shouldFitContainer } = {},
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
        borderTopLeftRadius: (element?.borderRadius?.topLeft !== undefined)
          ? element.borderRadius.topLeft : topLeft,
        borderTopRightRadius: (element?.borderRadius?.topRight !== undefined)
          ? element.borderRadius.topRight : topRight,
        borderBottomRightRadius: (element?.borderRadius?.bottomRight !== undefined)
          ? element.borderRadius.bottomRight : bottomRight,
        borderBottomLeftRadius: (element?.borderRadius?.bottomLeft !== undefined)
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
      background: (element?.background) || background,
    };
  });
});

export const getCustomStyles: GetStyles = memoizee((
  theme,
  appearance = 'default',
  baseAppearance = 'default',
) => memoizee((
  elementName,
  { propertyPath } = {
    propertyPath: '',
  },
) => {
  const propValue = selectTheme(
    theme,
    appearance,
    baseAppearance,
    [elementName, String(propertyPath)],
  );

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
  const filledStyles = getAppearanceStyleProperty(theme, appearance, baseAppearance, 'filled');

  return memoizee((
    elementName,
    {
      isDisabled,
      isFocused,
      isSelected,
      hasValue,
      isSearchable,
    } = {},
  ) => {
    const element = selectTheme(theme, appearance, baseAppearance, elementName);
    let elementStyles = {
      ...(isSearchable && element.searchable),
      ':hover': {
        ...((element?.hover) || hoverStyles),
      },
      ':active': {
        ...((element?.active) || activeStyles),
      },

    };

    if (isDisabled) {
      elementStyles = {
        ...elementStyles,
        ...((element?.disabled) || disabledStyles),
      };
    }

    if (isFocused) {
      elementStyles = {
        ...elementStyles,
        ...((element?.focus) || focusStyles),
      };
    }

    if (isSelected) {
      elementStyles = {
        ...elementStyles,
        ...((element?.selected) || selectedStyles),
      };
    }

    if (hasValue) {
      elementStyles = {
        ...elementStyles,
        ...((element?.filled) || filledStyles),
      };
    }

    return elementStyles;
  });
});
