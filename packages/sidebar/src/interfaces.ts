import { ReactNode } from 'react';
import { CSSObject } from 'styled-components';
import { IThemeNamespace } from '@xcritical/theme';


export interface IWrapperProps {
  navComponent?: ReactNode;
  arrowComponent?: ReactNode;
  children?: ReactNode;
  theme?: IThemeNamespace<ISidebarTheme>;
  showScrollbar?: boolean | string;
}

export interface ISidebarTheme {
  leftBackground: string;
  rightBackground: string;
  color: string;
  separatorColor: string;
  minWidth: number;
  maxWidth: number;
  leftWidth: number;
  zIndex: number;
  closeOpenButton?: CSSObject;
}

export interface IProps {
  theme: ISidebarTheme;
}

export interface IResponsiveWrapper {
  animate: boolean;
}

export interface IChildWrapper extends IProps {
  animate: boolean;
}

export interface ICloseOpenButton {
  cssStyles?: CSSObject;
  toRight: boolean;
}
