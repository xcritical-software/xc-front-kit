import { ReactNode } from 'react';
import { CSSObject } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';


export interface ISidebarTheme {
  rootContainer?: CSSObject;
  sidebarContainer?: CSSObject;
  navContainer?: CSSObject;
  childContainer?: CSSObject;
  responsiveContainer?: CSSObject;
  separatorContainer?: CSSObject;
  separator?: CSSObject;
  closeOpenButton?: CSSObject;
}

export type SidebarTheme = IThemeNamespace<ISidebarTheme>;

export interface ISidebarProps {
  children?: ReactNode;
  navComponent?: ReactNode;
  arrowComponent?: ReactNode;
  theme?: SidebarTheme;
  isScrollbarAutoHide?: boolean;
  withArrow?: boolean;
  isRTL?: boolean;
  minWidth?: number;
  maxWidth?: number;
  navWidth?: number;
  separatorWidth?: number;
  minimizedWidth?: number;
  onChangeState?: Function;
  collapsed?: boolean;
  width?: number;
}

export interface ISidebarStates {
  offsetLeft: number;
}

export interface IResponsiveWrapper {
  animate: boolean;
  width?: number;
  theme?: SidebarTheme;
  isRTL?: boolean;
}

export interface IChildWrapper extends ISidebarProps {
  animate: boolean;
}

export interface ISeparatorWrapper extends ISidebarProps {
  separatorWidth: number;
}

export interface ICloseOpenButton {
  toRight: boolean;
}

export interface IScrollbarProps {
  width?: number;
  animate?: boolean;
}
