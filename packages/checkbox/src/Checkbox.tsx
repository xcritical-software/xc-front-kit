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
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked, e);
    },
    [onChange]
  );

  const handleClick = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
  }, []);

  return (
    <CheckboxLabel
      className="at-checkbox__label"
      appearance={appearance}
      baseAppearance={baseAppearance}
      disabled={disabled}
      onClick={handleClick}>
      <HiddenCheckbox
        className="at-checkbox__hidden"
        type={type}
        checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onChange={handleInputChange}
      />
      <CheckboxWrapper
        className="at-checkbox__wrapper"
        appearance={appearance}
        baseAppearance={baseAppearance}
        type={type}>
        {checkIcon ? (
          <StyledCheckbox
            className="at-checkbox"
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {checked && checkIcon}
          </StyledCheckbox>
        ) : (
          <DefaultCheckbox
            className="at-checkbox__default"
            appearance={appearance}
            baseAppearance={baseAppearance}
            checked={checked}
            type={type}
          />
        )}
      </CheckboxWrapper>
      {label && (
        <LabelWrapper
          className="at-checkbox__label-wrapper"
          appearance={appearance}
          baseAppearance={baseAppearance}>
          {label}
        </LabelWrapper>
      )}
    </CheckboxLabel>
  );
};

export const Checkbox = React.memo(withTheme(PureCheckbox));
