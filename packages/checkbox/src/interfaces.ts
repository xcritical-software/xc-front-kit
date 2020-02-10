import { ITheme, ICSSProperties } from '@xcritical/theme';


export interface ICheckboxTheme extends ICSSProperties {
  borderRadius?: number;
  outline?: string;
}

export type CheckboxTheme = ITheme<ICheckboxTheme>;

export interface IStyledProps {
  theme: CheckboxTheme;
  appearance?: string;
  baseAppearance?: string;
}

export interface ICheckboxProps extends IStyledProps {
  type?: 'checkbox' | 'radio';
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  checkIcon?: React.ReactElement;
  onChange?: (checked: boolean) => void;
}

export interface IStyledCheckboxProps {
  theme: CheckboxTheme;
  appearance: string;
  baseAppearance: string;
  type?: 'checkbox' | 'radio';
  checked?: boolean;
  disabled?: boolean;
}

export interface IOption {
  value: string | number;
  label: string;
}

export interface ISwitchGroupProps extends IStyledProps {
  type?: 'checkbox' | 'radio';
  values: (string | number)[];
  options: IOption[];
  disabled?: boolean;
  onChange: (values: (string | number)[]) => void;
}
