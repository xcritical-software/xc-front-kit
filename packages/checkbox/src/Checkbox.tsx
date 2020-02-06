import React, { useCallback } from 'react';
import { withTheme } from 'styled-components';

import { ICheckboxProps } from './interfaces';
import {
  CheckboxLabel,
  CheckboxWrapper,
  DefaultCheckbox,
  Checkbox as StyledCheckbox,
  HiddenCheckbox,
} from './styled';


export const PureCheckbox: React.FC<ICheckboxProps> = ({
  theme,
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
    <CheckboxLabel theme={ theme }>
      <HiddenCheckbox
        type="checkbox"
        checked={ checked }
        disabled={ disabled }
        onChange={ handleInputChange }
      />
      <CheckboxWrapper theme={ theme }>
        {
          checkIcon ? (
            <StyledCheckbox>
              {
                checked && checkIcon
              }
            </StyledCheckbox>
          ) : (
            <DefaultCheckbox theme={ theme } checked={ checked } />
          )
        }
      </CheckboxWrapper>
      { label }
    </CheckboxLabel>
  );
};

export const Checkbox = React.memo(withTheme(PureCheckbox));
