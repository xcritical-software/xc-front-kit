import {
  ITheme, IThemeNamespace, ICSSProperties, IIsRTL,
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

type HtmlAttributes = Pick<React.InputHTMLAttributes<HTMLElement>,
Exclude<keyof React.InputHTMLAttributes<HTMLElement>, keyof IBaseItemProps | 'css'>
>;

export interface IBaseItemProps {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  invalid?: boolean;
  isDivided?: boolean;
  onValidate?: (result: boolean) => void;
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IInputProps
  extends HtmlAttributes,
  IInputAppearanceProps,
  IIsRTL,
  IBaseItemProps {
  css?: any;
}
export interface IStyledInput extends HtmlAttributes, ISubComponentProps {

}

export interface ISubComponentProps extends IIsRTL {
  theme: IThemeNamespace<InputTheme>;
  appearance: string;
  baseAppearance: string;
  isDivided?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  css?: any;
}
