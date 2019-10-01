export type AllType = undefined | null | boolean | Buffer | number | string | Date | RegExp | Error
| Iterator<any> | any[] | Function | Promise<any> | Map<any, any> | WeakMap<any, any> | Set<any>
| WeakSet<any> | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array
| Int32Array | Uint32Array | Float32Array | Float64Array | any;

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

export interface IThemeBase extends IStylesBase {
  hover?: IStylesBase;
  active?: IStylesBase;
  disabled?: IStylesBase;
  selected?: IStylesBase;
  focus?: IStylesBase;
  invalid?: IStylesBase;
}

export interface ITheme extends IThemeBase {
  appearance?: IAppearance;
}

export interface IAppearance {
  default: IThemeBase;
}

export interface IThemeNamespace {
  [namespace: string]: ITheme;
}
