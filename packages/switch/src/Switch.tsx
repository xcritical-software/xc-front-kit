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
  className,
  classNamePrefix,
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, e);
    },
    [onChange]
  );

  return (
    <SwitchLabel
      className={className}
      disabled={disabled}
      appearance={appearance}
      baseAppearance={baseAppearance}
      labelPosition={labelPosition}>
      <SwitchHiddenCheckbox
        className={classNamePrefix && `${classNamePrefix}--checkbox-hidden`}
        type="checkbox"
        name={name ?? label ?? ''}
        checked={checked}
        disabled={disabled}
        onChange={handleInputChange}
      />

      <SwitchContainer
        className={classNamePrefix && `${classNamePrefix}--container`}
        disabled={disabled}
        checked={checked}
        appearance={appearance}
        baseAppearance={baseAppearance}>
        <SwitchHandle
          className={classNamePrefix && `${classNamePrefix}--handle`}
          checked={checked}
          appearance={appearance}
          baseAppearance={baseAppearance}
        />
      </SwitchContainer>

      {label && (
        <SwitchLabelText
          className={classNamePrefix && `${classNamePrefix}--label-text`}
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
