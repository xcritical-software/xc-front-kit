import { ReactNode } from 'react';

import { ITheme, ICSSProperties } from '@xcritical/theme';


export interface ISidebarTheme extends ICSSProperties {
  leftBackground?: string;
  rightBackground?: string;
  color?: string;
  separatorColor?: string;
  minWidth?: number;
  maxWidth?: number;
  leftWidth?: number;
}

export type SidebarTheme = ITheme<ISidebarTheme>;

export interface ISidebarProps {
  navComponent?: ReactNode;
  children?: ReactNode;
  theme: SidebarTheme;
  showScrollbar?: boolean | string;
  withArrow?: boolean;
  isRTL?: boolean;
  minWidth?: number;
  maxWidth?: number;
  separatorWidth?: number;
  arrowComponent?: ReactNode;
}

export interface ISidebarStates {
  offsetLeft: number;
}

export interface IReturnFunctionForConcreteProp<TValue> {
  (
    theme: SidebarTheme,
  ): TValue;
}

export interface IReturnFunctionForProp<TValue> {
  (
    theme: SidebarTheme,
    propertyPath: string,
    defaultPropertyValue?: string,
  ): TValue;
}

export interface IReturnFunctionForElementStyles<TValue> {
  (
    theme: SidebarTheme,
    elementName: string,
  ): TValue;
}

export interface IReturnWithArgsFunction<TProp, TValue> {
  (elementName: string, ...props: TProp[]): TValue;
}

export type GetPropStyles<TResult> =
  IReturnFunctionForProp<IReturnWithArgsFunction<any, TResult>>;

export interface IResponsiveWrapper {
  animate: boolean;
}

export interface IChildWrapper extends ISidebarProps {
  animate: boolean;
}

export interface ICloseOpenButton {
  toRight: boolean;
}

export type IThemeProp<T> = T;

export interface IScrollbarProps {
  width?: number;
  marginLeft?: string;
}
