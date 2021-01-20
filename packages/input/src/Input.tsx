/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback, useRef, useState } from 'react';

import { useCombinedRefs } from '@xcritical/utils';

import {
  Root,
  Prefix,
  Postfix,
  StyledInput,
  ClearIconWrapper,
} from './styled/Input';
import { IInputProps } from './interfaces';
import { DefaultClearIcon } from './Icons';


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
  isClearable,
  clearIcon: ClearIcon = DefaultClearIcon,
  value,
  onFocus,
  onBlur,
  ...rest
}, ref: React.MutableRefObject<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
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

  const inputOnClear = useCallback(() => {
    if (onChange) onChange('');
  }, [onChange]);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    setIsFocused(true);

    if (onFocus) onFocus(event);
  }, [onFocus]);
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    setIsFocused(false);

    if (onBlur) onBlur(event);
  }, [onBlur]);

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
      hasValue={ !!value }
      focusOnInput={ isFocused }
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
        value={ value }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        { ...rest }
      />
      {
        isClearable && !!value && (
          <ClearIconWrapper
            appearance={ appearance }
            baseAppearance={ baseAppearance }
            onClick={ inputOnClear }
            disabled={ disabled }
            invalid={ invalid }
            hasValue={ !!value }
            focusOnInput={ isFocused }
          >
            <ClearIcon />
          </ClearIconWrapper>
        )
      }
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
