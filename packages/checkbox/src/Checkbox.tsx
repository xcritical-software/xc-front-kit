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
  className,
  classNamePrefix,
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
      className={className}
      appearance={appearance}
      baseAppearance={baseAppearance}
      disabled={disabled}
      onClick={handleClick}>
      <HiddenCheckbox
        className={classNamePrefix && `${classNamePrefix}_hidden`}
        type={type}
        checked={checked}
        disabled={disabled}
        onClick={handleClick}
        onChange={handleInputChange}
      />
      <CheckboxWrapper
        className={classNamePrefix && `${classNamePrefix}__wrapper`}
        appearance={appearance}
        baseAppearance={baseAppearance}
        type={type}>
        {checkIcon ? (
          <StyledCheckbox
            className={classNamePrefix && `${classNamePrefix}_styled`}
            appearance={appearance}
            baseAppearance={baseAppearance}>
            {checked && checkIcon}
          </StyledCheckbox>
        ) : (
          <DefaultCheckbox
            className={classNamePrefix && `${classNamePrefix}_default`}
            appearance={appearance}
            baseAppearance={baseAppearance}
            checked={checked}
            type={type}
          />
        )}
      </CheckboxWrapper>
      {label && (
        <LabelWrapper
          className={classNamePrefix && `${classNamePrefix}__label-wrapper`}
          appearance={appearance}
          baseAppearance={baseAppearance}>
          {label}
        </LabelWrapper>
      )}
    </CheckboxLabel>
  );
};

export const Checkbox: React.FC<ICheckboxProps> = React.memo(
  withTheme(PureCheckbox)
);
