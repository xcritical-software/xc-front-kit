import React from 'react';
import { CSSObject } from 'styled-components';

import { ICSSProperties, ITheme } from '@xcritical/theme';

export interface ISwitchTheme extends ICSSProperties {
  label?: CSSObject;
  labelText?: CSSObject & { rightPosition: CSSObject; leftPosition: CSSObject };
  container?: CSSObject;
  handle?: CSSObject;
}

export type SwitchTheme = ITheme<ISwitchTheme>;

export interface ISwitchStyledProps {
  theme: SwitchTheme;
  appearance?: string;
  baseAppearance?: string;
}

export interface ISwitchStateProps {
  checked: boolean;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
}

export interface ISwitchProps extends ISwitchStyledProps, ISwitchStateProps {
  onChange: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  label?: string;
  name?: string;
}

export type StyledSwitchProps = Required<ISwitchStyledProps> &
  Partial<ISwitchStateProps>;

export type BaseSwitch = Omit<ISwitchProps, 'checked' | 'onChange'>;
