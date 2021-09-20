import React from 'react';

import {
  ITheme,
  IThemeNamespace,
  ICSSProperties,
  IIsRTL,
} from '@xcritical/theme';

export interface IBaseInputTheme extends ICSSProperties {
  prefixSpacing?: number;
  postfixSpacing?: number;
}

export type InputTheme = ITheme<IBaseInputTheme>;

export interface IInputAppearanceProps {
  theme?: IThemeNamespace<InputTheme>;
  appearance?: string;
  baseAppearance?: string;
}

type HtmlAttributes = Pick<
  React.InputHTMLAttributes<HTMLElement>,
  Exclude<
    keyof React.InputHTMLAttributes<HTMLElement>,
    keyof IBaseItemProps | 'css'
  >
>;

export interface IBaseItemProps {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  invalid?: boolean;
  isDivided?: boolean;
  onValidate?: (
    result: boolean,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
  isClearable?: boolean;
  clearIcon?: React.FC;
}

export interface IInputProps
  extends HtmlAttributes,
    IInputAppearanceProps,
    IIsRTL,
    IBaseItemProps {
  css?: any;
  shouldFitContainer?: boolean;
  showArrows?: boolean;
}
export interface IStyledInput extends HtmlAttributes, ISubComponentProps {
  showArrows: boolean;
  type?: string;
}

export interface ISubComponentProps extends IIsRTL {
  theme: IThemeNamespace<InputTheme>;
  appearance: string;
  shouldFitContainer?: boolean;
  baseAppearance: string;
  isDivided?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  css?: any;
  hasValue?: boolean;
  focusOnInput?: boolean;
}
