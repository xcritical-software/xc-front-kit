import { ITheme, ICSSProperties } from '@xcritical/theme';


export interface ICheckboxTheme extends ICSSProperties {
  borderRadius?: number;
  outline?: string;
}

export type CheckboxTheme = ITheme<ICheckboxTheme>;

export interface ICheckboxProps {
  theme: CheckboxTheme;
  appearance?: string;
  baseAppearance?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  checkIcon?: React.ReactElement;
  onChange?: (checked: boolean) => void;
}

export interface IReturnFunction<TValue> {
  (
    theme: ICheckboxTheme,
    elementName: string,
  ): TValue;
}
