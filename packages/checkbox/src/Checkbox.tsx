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
  dataAtField = null,
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
      data-at-field={dataAtField && `${dataAtField}__checkbox-block`}
      appearance={appearance}
      baseAppearance={baseAppearance}
      disabled={disabled}
      onClick={handleClick}>
      <HiddenCheckbox
        type={type}
        checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onChange={handleInputChange}
      />
      <CheckboxWrapper
        data-at-field={dataAtField && `${dataAtField}__checkbox-wrapper`}
        appearance={appearance}
        baseAppearance={baseAppearance}
        type={type}>
        {checkIcon ? (
          <StyledCheckbox
            data-at-field={dataAtField && `${dataAtField}__styled-checkbox`}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {checked && checkIcon}
          </StyledCheckbox>
        ) : (
          <DefaultCheckbox
            data-at-field={dataAtField && `${dataAtField}__default-checkbox`}
            appearance={appearance}
            baseAppearance={baseAppearance}
            checked={checked}
            type={type}
          />
        )}
      </CheckboxWrapper>
      {label && (
        <LabelWrapper
          appearance={appearance}
          baseAppearance={baseAppearance}
          data-at-field={dataAtField && `${dataAtField}__checkbox-label`}>
          {label}
        </LabelWrapper>
      )}
    </CheckboxLabel>
  );
};

export const Checkbox = React.memo(withTheme(PureCheckbox));
