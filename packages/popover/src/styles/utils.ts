import { getAppearanceTheme } from '@xcritical/theme';

import { IThemed, ArrowDirection } from '../interfaces';
import { popperThemeNamespace, defaultPopperTheme } from '../theme';


export const getPopperProperty = ({
  theme,
  appearance,
  baseAppearance,
}: IThemed): (propertyPath: string[]) => any => {
  const func = getAppearanceTheme(popperThemeNamespace, defaultPopperTheme);

  return (propertyPath) => func(theme, appearance, propertyPath, baseAppearance);
};

export const getArrowSizes = (
  props: IThemed,
  arrowDirection: ArrowDirection,
): {
  width: string;
  height: string;
} => {
  const size = getPopperProperty(props)(['arrow', 'size']);

  switch (arrowDirection) {
    case 'top':
    case 'bottom': {
      return {
        width: `calc(${size} * 2)`,
        height: size,
      };
    }
    case 'right':
    case 'left': {
      return {
        width: size,
        height: `calc(${size} * 2)`,
      };
    }
    default: return {
      width: '0',
      height: '0',
    };
  }
};

export const getArrowBorderWidth = (props: IThemed, arrowDirection: ArrowDirection): string => {
  const size = getPopperProperty(props)(['arrow', 'size']);

  switch (arrowDirection) {
    case 'top': return `${size} ${size} 0 ${size}`;
    case 'right': return `${size} ${size} ${size} 0`;
    case 'bottom': return `0 ${size} ${size} ${size}`;
    case 'left': return `${size} 0 ${size} ${size}`;
    default: return '';
  }
};
