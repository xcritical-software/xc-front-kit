// eslint-disable-next-line import/no-unresolved
import * as CSS from 'csstype';

export interface ICSSProperties extends CSS.Properties<string | number | any> {
  [key: string]: string | number | any | undefined;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AllType = any;
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
  weight?:
    | ICSSWideKeyword
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
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

export interface IHtmlActionStates<T> {
  hover?: T;
  active?: T;
  disabled?: T;
  selected?: T;
  focus?: T;
  invalid?: T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type IThemeBase<T> = T & IHtmlActionStates<T>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ITheme<T = ICSSProperties | any> = Pick<
  IThemeBase<T>,
  Exclude<keyof IThemeBase<T>, 'appearance'>
> & {
  appearance?: IAppearance<T>;
};

export interface IAppearance<T> {
  [namespace: string]: IThemeBase<T>;
}

export interface IThemeNamespace<T = ICSSProperties | any> {
  [namespace: string]: ITheme<T> | IThemeBase<T>;
}

export interface IApperanceStateFunc<T> {
  (
    theme: IThemeNamespace,
    appearanceName: string,
    propertyPath?: string | string[],
    baseAppearanceName?: string
  ): ITheme | ITheme<T>;
}

export interface IReturnThemeFunction<T, TProp = [], TValue = any> {
  (
    theme: IThemeNamespace<ITheme<T>>,
    appearance: string,
    baseAppearance: string,
    ...props: TProp[]
  ): TValue;
}
