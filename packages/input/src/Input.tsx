/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import {
  Root,
  Prefix,
  Suffix,
  StyledInput,
} from './styled/Input';


const propTypes = {
  className: PropTypes.string,
  appearance: PropTypes.string,
  baseAppearance: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  invalid: PropTypes.bool,
  maxLength: PropTypes.number,
  isRTL: PropTypes.bool,
  isDivided: PropTypes.bool,
  pattern: PropTypes.instanceOf(RegExp),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onValidate: PropTypes.func,
};

const defaultProps = {
  className: '',
  appearance: 'default',
  baseAppearance: 'default',
  id: '',
  name: '',
  placeholder: '',
  prefix: null,
  suffix: null,
  type: 'text',
  value: '',
  autoFocus: false,
  autoComplete: 'on',
  disabled: false,
  selected: false,
  invalid: false,
  maxLength: Infinity,
  isRTL: false,
  isDivided: false,
  pattern: null,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onValidate: () => {},
};

export const PureInput = ({
  className,
  appearance,
  baseAppearance,
  id,
  name,
  placeholder,
  prefix,
  suffix,
  type,
  value,
  autoFocus,
  autoComplete,
  maxLength,
  isRTL,
  isDivided,
  disabled,
  selected,
  invalid,
  pattern,
  onChange,
  onFocus,
  onBlur,
  onValidate,
  ...rest
}) => {
  const inputOnChange = (e) => {
    if (onValidate && pattern) {
      onValidate(pattern.test(e.target.value));
    }

    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Root
      className={ className }
      appearance={ appearance }
      baseAppearance={ baseAppearance }
      isRTL={ isRTL }
      disabled={ disabled }
      selected={ selected }
      invalid={ invalid }
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
        id={ id }
        name={ name }
        placeholder={ placeholder }
        type={ type }
        autoComplete={ autoComplete }
        autoFocus={ autoFocus }
        value={ value }
        maxLength={ maxLength }
        isRTL={ isRTL }
        isDivided={ isDivided }
        disabled={ disabled }
        selected={ selected }
        invalid={ invalid }
        hasPrefix={ !!prefix }
        hasSuffix={ !!suffix }
        onChange={ inputOnChange }
        onFocus={ onFocus }
        onBlur={ onBlur }
        { ...rest }
      />
      { !!suffix && (
        <Suffix
          appearance={ appearance }
          baseAppearance={ baseAppearance }
          isRTL={ isRTL }
          isDivided={ isDivided }
        >
          { suffix }
        </Suffix>
      ) }
    </Root>
  );
};

PureInput.propTypes = propTypes;
PureInput.defaultProps = defaultProps;

export const Input = withTheme(PureInput);
