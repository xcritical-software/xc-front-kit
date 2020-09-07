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

import DefaultLoader from './icons';


const PureSwitch: React.FC<ISwitchProps> = ({
  name,
  onChange,
  label,
  labelPosition = 'right',
  loading = false,
  loader: Loader = DefaultLoader,
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
    >
      <SwitchHiddenCheckbox
        type="checkbox"
        name={ name ?? label ?? '' }
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
