import { ITheme, ICSSProperties } from '@xcritical/theme';

export interface ICheckboxTheme extends ICSSProperties {
  checkboxLabel?: ICSSProperties;
  checkboxWrapper?: ICSSProperties;
  checkbox?: ICSSProperties;
  labelWrapper?: ICSSProperties;
  switchGroupWrapper?: ICSSProperties;
}

export type CheckboxTheme = ITheme<ICheckboxTheme>;

export interface IStyledProps {
  theme: CheckboxTheme;
  appearance?: string;
  baseAppearance?: string;
  className?: string;
  classNamePrefix?: string;
}

export interface ICheckboxProps {
  appearance?: string;
  baseAppearance?: string;
  className?: string;
  classNamePrefix?: string;
  type?: 'checkbox' | 'radio';
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  checkIcon?: React.ReactElement;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
  checkIcon?: ICheckboxProps['checkIcon'];
  options: IOption[];
  disabled?: boolean;
  onChange: (values: (string | number)[]) => void;
}
