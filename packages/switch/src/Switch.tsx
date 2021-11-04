import React, { useCallback } from 'react';
import { withTheme } from 'styled-components';

import {
  SwitchContainer,
  SwitchLabel,
  SwitchLabelText,
  SwitchHandle,
  SwitchHiddenCheckbox,
} from './styled';
import { ISwitchProps } from './interfaces';

const PureSwitch: React.FC<ISwitchProps> = ({
  name,
  onChange,
  label,
  labelPosition = 'right',
  checked = false,
  disabled = false,
  appearance = 'default',
  baseAppearance = 'default',
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, e);
    },
    [onChange]
  );

  return (
    <SwitchLabel
      className="at-switch__label"
      disabled={disabled}
      appearance={appearance}
      baseAppearance={baseAppearance}
      labelPosition={labelPosition}>
      <SwitchHiddenCheckbox
        className="at-switch__hidden-checkbox"
        type="checkbox"
        name={name ?? label ?? ''}
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
      />

      <SwitchContainer
        className="at-switch__container"
        disabled={disabled}
        checked={checked}
        appearance={appearance}
        baseAppearance={baseAppearance}>
        <SwitchHandle
          className="at-switch__handle"
          checked={checked}
          appearance={appearance}
          baseAppearance={baseAppearance}
        />
      </SwitchContainer>

      {label && (
        <SwitchLabelText
          className="at-switch__label-text"
          labelPosition={labelPosition}
          appearance={appearance}
          baseAppearance={baseAppearance}>
          {label}
        </SwitchLabelText>
      )}
    </SwitchLabel>
  );
};

export const Switch = React.memo(withTheme(PureSwitch));
