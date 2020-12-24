/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback, useRef } from 'react';

import { useCombinedRefs } from '@xcritical/utils';

import {
  Root,
  Prefix,
  Postfix,
  StyledInput,
} from './styled/Input';
import { IInputProps } from './interfaces';


export const PureInput = React.forwardRef<HTMLInputElement, IInputProps>(({
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
}, ref: React.MutableRefObject<HTMLInputElement>) => {
  const innerRef = useRef<HTMLInputElement>(null);
  const combinedRef = useCombinedRefs(null, ref, innerRef);

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

  const handleClick = useCallback(() => {
    combinedRef.current?.focus();
  }, []);

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
      onClick={ handleClick }
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
        ref={ combinedRef }
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
});
