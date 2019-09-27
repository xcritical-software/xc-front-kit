import {
  getAppearanceTheme,
} from '@xcritical/xc-theme/utils';
import {
  sidebarThemeNamespace,
  sidebarThemeStyle,
} from '../theme';
import { ITheme } from '@xcritical/xc-theme/interfaces';



export const sidebarTheme = (
  theme : any,
  appearanceName: string,
  baseAppearance: string,
  propertyPath : string,
):  ITheme => {
  const func = getAppearanceTheme(sidebarThemeNamespace, sidebarThemeStyle);
  return func(theme, appearanceName, propertyPath, baseAppearance);
};


export const getLeftBackground = ({ theme,
  appearance,
  baseAppearance } : any) => {
    const backgroundColor = sidebarTheme(
      theme, appearance, baseAppearance, 'leftBackground',
    )  as string;
    return backgroundColor
  }
  export const getRightBackground = ({ theme,
    appearance,
    baseAppearance } : any) => {
      const backgroundColor = sidebarTheme(
        theme, appearance, baseAppearance, 'rightBackground',
        )  as string;
        return backgroundColor
      }
export const getSeparatorColor = ({ theme,
  appearance,
  baseAppearance } : any) => {
    const backgroundColor = sidebarTheme(
      theme, appearance, baseAppearance, 'separatorColor',
      )  as string;
    return backgroundColor
  }
  export const getColor = ({ theme,
    appearance,
    baseAppearance } : any) => {
      const color = sidebarTheme(
        theme, appearance, baseAppearance, 'color',
        ) as string;
    return color
}

