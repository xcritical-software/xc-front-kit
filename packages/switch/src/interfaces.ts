import React from 'react';
import { CSSObject } from 'styled-components';

import { ICSSProperties, ITheme } from '@xcritical/theme';


export interface ISwitchTheme extends ICSSProperties {
  label?: CSSObject;
  hiddenCheckbox?: CSSObject;
  container?: CSSObject;
  containerCheckboxChecked?: CSSObject;
  containerCheckboxDisabled?: CSSObject;
  handle?: CSSObject;
  handleCheckboxChecked?: CSSObject;
  handleItem?: CSSObject;
}

export type SwitchTheme = ITheme<ISwitchTheme>;

export interface ISwitchStyledProps {
  theme: SwitchTheme;
  appearance?: string;
  baseAppearance?: string;
}


export interface ISwitchProps extends ISwitchStyledProps {
  checked: boolean;
  onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  label?: string;
  labelPosition: 'left' | 'right';
  loading?: boolean;
  loader?: React.FC;
  disabled?: boolean;
  name?: string;
}


export type StyledSwitchProps = Required<ISwitchStyledProps>;

export type StyledSwitchStyledWithLabelPosition = Required<ISwitchStyledProps & Pick<ISwitchProps, 'labelPosition'>>;
export type BaseSwitch = Omit<ISwitchProps, 'checked' | 'onChange'>;
