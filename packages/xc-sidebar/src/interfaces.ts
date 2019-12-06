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
  appearance?: string;
  baseAppearance?: string;
  showScrollbar?: boolean | string;
  withBorderArrow?: boolean;
  isRTL?: boolean;
  minWidth?: number;
  maxWidth?: number;
  separatorWidth?: number;
}

export interface ISidebarStates {
  offsetLeft: number;
}

export interface IReturnFunctionForConcreteProp<TValue> {
  (
    theme: SidebarTheme,
    appearance?: string,
    baseAppearance?: string,
  ): TValue;
}

export interface IReturnFunctionForProp<TValue> {
  (
    theme: SidebarTheme,
    propertyPath: string,
    appearance?: string,
    baseAppearance?: string,
    defaultPropertyValue?: string,
  ): TValue;
}

export interface IReturnFunctionForElementStyles<TValue> {
  (
    theme: SidebarTheme,
    elementName: string,
    appearance?: string,
    baseAppearance?: string,
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
