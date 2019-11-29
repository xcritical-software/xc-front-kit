/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback } from 'react';

import {
  Root,
  Prefix,
  Postfix,
  StyledInput,
} from './styled/Input';
import { IInputProps } from './interfaces';


export const PureInput: React.FC<IInputProps> = ({
  className,
  appearance = 'default',
  baseAppearance = 'default',
  prefix,
  postfix,
  isRTL = false,
  isDivided = false,
  disabled = false,
  invalid = false,
  pattern,
  onChange,
  onValidate,
  type = 'text',
  autoComplete = 'on',
  shouldFitContainer = false,
  css,
  ...rest
}) => {
  const inputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onValidate && pattern) {
        onValidate(RegExp(pattern).test(e.target.value));
      }

      if (onChange) {
        onChange(e.target.value, e);
      }
    }, [onChange, onValidate, pattern],
  );

  return (
    <Root
      className={ className }
      appearance={ appearance }
      baseAppearance={ baseAppearance }
      isRTL={ isRTL }
      disabled={ disabled }
      invalid={ invalid }
      css={ css }
      shouldFitContainer={ shouldFitContainer }
    >
      { !!prefix && (
        <Prefix
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          isRTL={ isRTL }
          isDivided={ isDivided }
        >
          { prefix }
        </Prefix>
      ) }
      <StyledInput
        appearance={ appearance }
        baseAppearance={ baseAppearance }
        isRTL={ isRTL }
        isDivided={ isDivided }
        disabled={ disabled }
        invalid={ invalid }
        onChange={ inputOnChange }
        type={ type }
        autoComplete={ autoComplete }
        { ...rest }
      />
      { !!postfix && (
        <Postfix
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          isRTL={ isRTL }
          isDivided={ isDivided }
        >
          { postfix }
        </Postfix>
      ) }
    </Root>
  );
};
