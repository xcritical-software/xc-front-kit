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

import Loader from './icons';
import { ISwitchProps } from './interfaces';


const PureSwitch: React.FC<ISwitchProps> = ({
  name,
  onChange,
  label,
  labelPosition = 'right',
  loading = false,
  checked = false,
  disabled = false,
  appearance = 'default',
  baseAppearance = 'default',
}) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }, [onChange]);

  return (
    <SwitchLabel
      appearance={ appearance }
      baseAppearance={ baseAppearance }
    >
      <SwitchHiddenCheckbox
        type="checkbox"
        name={ name }
        checked={ checked }
        disabled={ loading || disabled }
        onChange={ handleInputChange }
      />

      { label && labelPosition === 'left'
                && (
                  <SwitchLabelText
                    labelPosition={ labelPosition }
                    appearance={ appearance }
                    baseAppearance={ baseAppearance }
                  >
                    { label }
                  </SwitchLabelText>
                ) }

      <SwitchContainer
        appearance={ appearance }
        baseAppearance={ baseAppearance }
      >
        <SwitchHandle
          appearance={ appearance }
          baseAppearance={ baseAppearance }
        >
          <SwitchHandleItem
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          >
            { loading && <Loader /> }
          </SwitchHandleItem>
        </SwitchHandle>
      </SwitchContainer>

      { label && labelPosition === 'right'
                && (
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
