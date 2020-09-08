import React, { useCallback } from 'react';

import { withTheme } from 'styled-components';

import {
  SwitchContainer,
  SwitchLabel,
  SwitchLabelText,
  SwitchHandle,
  SwitchHandleItem,
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
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e);
  }, [onChange]);

  return (
    <SwitchLabel
      appearance={ appearance }
      baseAppearance={ baseAppearance }
      labelPosition={ labelPosition }
    >
      <SwitchHiddenCheckbox
        type="checkbox"
        name={ name ?? label ?? '' }
        checked={ checked }
        disabled={ disabled }
        onChange={ handleInputChange }
      />

      <SwitchContainer
        disabled={ disabled }
        checked={ checked }
        appearance={ appearance }
        baseAppearance={ baseAppearance }
      >
        <SwitchHandle
          checked={ checked }
          appearance={ appearance }
          baseAppearance={ baseAppearance }
        >
          <SwitchHandleItem
            checked={ checked }
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          />
        </SwitchHandle>
      </SwitchContainer>

      { label && (
        <SwitchLabelText
          labelPosition={ labelPosition }
          appearance={ appearance }
          baseAppearance={ baseAppearance }
        >
          { label }
        </SwitchLabelText>
      ) }
    </SwitchLabel>
  );
};

export const Switch = React.memo(withTheme(PureSwitch));
