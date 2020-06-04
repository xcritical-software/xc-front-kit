import React, { useCallback } from 'react';
import { withTheme } from 'styled-components';

import { ICheckboxProps } from './interfaces';
import {
  CheckboxLabel,
  CheckboxWrapper,
  LabelWrapper,
  DefaultCheckbox,
  Checkbox as StyledCheckbox,
  HiddenCheckbox,
} from './styled/index';


export const PureCheckbox: React.FC<ICheckboxProps> = ({
  appearance = 'default',
  baseAppearance = 'default',
  type = 'checkbox',
  checked = false,
  disabled = false,
  label,
  checkIcon,
  onChange,
}) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.checked);
  }, [onChange]);

  return (
    <CheckboxLabel
      appearance={ appearance }
      baseAppearance={ baseAppearance }
      disabled={ disabled }
    >
      <HiddenCheckbox
        type={ type }
        checked={ checked }
        disabled={ disabled }
        onChange={ handleInputChange }
      />
      <CheckboxWrapper
        appearance={ appearance }
        baseAppearance={ baseAppearance }
        type={ type }
      >
        {
          checkIcon ? (
            <StyledCheckbox
              appearance={ appearance }
              baseAppearance={ baseAppearance }
            >
              {
                checked && checkIcon
              }
            </StyledCheckbox>
          ) : (
            <DefaultCheckbox
              appearance={ appearance }
              baseAppearance={ baseAppearance }
              checked={ checked }
              type={ type }
            />
          )
        }
      </CheckboxWrapper>
      {
        label && (
          <LabelWrapper
            appearance={ appearance }
            baseAppearance={ baseAppearance }
          >
            { label }
          </LabelWrapper>
        )
      }
    </CheckboxLabel>
  );
};

export const Checkbox = React.memo(withTheme(PureCheckbox));
