import {
  IIndentation, IFont, IThemeNamespace, IIsRTL,
} from '@xcritical/theme';
import { FlattenInterpolation, ThemedStyledProps, CSSProperties } from 'styled-components';


export type BaseInputTheme =
Exclude<keyof CSSProperties, keyof 'padding' | 'font'> & {
  padding?: IIndentation;
  prefixSpacing?: number;
  postfixSpacing?: number;
  font?: IFont;
};

export type InputTheme = BaseInputTheme & {
  outline?: BaseInputTheme;
  selected?: BaseInputTheme;
  active?: BaseInputTheme;
  hover?: BaseInputTheme;
  disabled?: BaseInputTheme;
};

export interface IInputApperanceProps {
  theme?: IThemeNamespace<InputTheme>;
  appearance?: string;
  baseAppearance?: string;
}

type HtmlAttributes = Pick<React.InputHTMLAttributes<HTMLElement>,
Exclude<keyof React.InputHTMLAttributes<HTMLElement>, keyof IBaseItemProps | 'css'>
> & { css?: FlattenInterpolation<ThemedStyledProps<IInputProps, any>> };

export interface IBaseItemProps {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  invalid?: boolean;
  isDivided?: boolean;
  onValidate?: (result: boolean) => {};
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => {};
}

export interface IInputProps
  extends HtmlAttributes,
  IInputApperanceProps,
  IIsRTL,
  IBaseItemProps {

}
