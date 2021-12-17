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
  className = '',
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, e);
    },
    [onChange]
  );

  return (
    <SwitchLabel
      className={`${className} at-switch--label`}
      disabled={disabled}
      appearance={appearance}
      baseAppearance={baseAppearance}
      labelPosition={labelPosition}>
      <SwitchHiddenCheckbox
        className="at-switch--checkbox-hidden"
        type="checkbox"
        name={name ?? label ?? ''}
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
      />

      <SwitchContainer
        className="at-switch--container"
        disabled={disabled}
        checked={checked}
        appearance={appearance}
        baseAppearance={baseAppearance}>
        <SwitchHandle
          className="at-switch--handle"
          checked={checked}
          appearance={appearance}
          baseAppearance={baseAppearance}
        />
      </SwitchContainer>

      {label && (
        <SwitchLabelText
          className="at-switch--label-text"
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
