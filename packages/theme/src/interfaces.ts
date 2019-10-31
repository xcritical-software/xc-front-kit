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

export type ICSSWideKeyword = 'initial' | 'inherit' | 'unset';
export interface IFont {
  size?: number | string;
  weight?: ICSSWideKeyword | 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
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
  fill?: string;
  width?: number | string;
  height?: number | string;
  padding?: number | string | IIndentation;
  margin?: number | string |IIndentation;
  font?: IFont;
  border?: IBorder;
  borderRadius?: IBorderRadius | number;
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
};

export type ITheme<T = IStylesBase> = IThemeBase<T> & {
  appearance?: IAppearance<T>;
};

export type Theme<T = IStylesBase> = IThemeBase<T> & {
  appearance?: IAppearance<T>;
};

export interface IAppearance<T> {
  [namespace: string]: IThemeBase<T>;
}

export interface IThemeNamespace<T = IStylesBase> {
  [namespace: string]: ITheme<T>;
}

export interface IReturnThemeFunction<T, TProp = [], TValue = any> {
  (
    theme: IThemeNamespace<ITheme<T>>,
    appearance: string,
    baseAppearance: string,
    ...props: TProp[]
  ): TValue;
}
