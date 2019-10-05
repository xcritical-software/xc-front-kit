/* eslint-disable @typescript-eslint/no-explicit-any */
export type AllType = undefined | null | boolean | Buffer | number | string | Date | RegExp | Error
| Iterator<any> | any[] | Function | Promise<any> | Map<any, any> | WeakMap<any, any> | Set<any>
| WeakSet<any> | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array
| Int32Array | Uint32Array | Float32Array | Float64Array | any;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type IFilteredPath = string[];

export type OneOrManyString = string | string[];

export interface IIndentation {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface IFont<T> {
  fontSize?: T;
  fontWeight?: number;
  size?: T;
  weight?: number;
  lineHeight?: string;
  lineHeightRatio?: number;
}

export interface IBorder {
  width?: number;
  style?: string;
  color?: string;
}

export interface IBorderRadius {
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}

export interface ITransition {
  property?: string;
  duration?: OneOrManyString;
  timingFunction?: string;
  delay?: OneOrManyString;
}

export interface IStylesBase {
  display?: string;
  background?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  padding?: IIndentation;
  margin?: IIndentation;
  font?: IFont<number>;
  border?: IBorder;
  borderRadius?: IBorderRadius;
  transition?: ITransition;
  opacity?: number;
}

export type IThemeBase<T> = T & {
  hover?: T;
  active?: T;
  disabled?: T;
  selected?: T;
  focus?: T;
  invalid?: T;
}

export type ITheme<T = IStylesBase> = IThemeBase<T> & {
  appearance?: IAppearance<T>;
}

export type Theme<T = IStylesBase> = IThemeBase<T> & {
  appearance?: IAppearance<T>;
}

export interface IAppearance<T> {
  default: IThemeBase<T>;
}

export interface IThemeNamespace<T= IStylesBase> {
  [namespace: string]: ITheme<T>;
}
