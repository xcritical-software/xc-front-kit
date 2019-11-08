import React, {
  useState, useRef, useEffect, useCallback, useContext, useMemo,
} from 'react';
import Select from 'react-select';

import { ThemeContext } from 'styled-components';
import { IThemeNamespace } from '@xcritical/theme';
import {
  getFormatOptionLabel,
  ClearIndicator,
  MultiValueRemove,
  DropdownIndicator,
} from './styled';
import { convertToOptions, findOptionByValue, themeConverter } from './utils';
import { SelectProps, ISelectBaseTheme } from './interfaces';


export const PureSelect: React.FC<SelectProps> = React.memo<SelectProps>(({
  className,
  disabled = false,
  isMulti = false,
  isSearchable = false,
  isRTL = false,
  isCloseMenuOnSelect = true,
  isHideSelectedOptions = true,
  isControlShouldRenderValue = true,
  appearance = 'default',
  baseAppearance = 'default',
  shouldFitContainer = false,
  items = {},
  value,
  placeholder,
  onChange,
  theme,
  components,
  ...rest
}) => {
  const themeContext = useContext<IThemeNamespace<ISelectBaseTheme>>(ThemeContext);
  const innerTheme = theme || themeContext || {};

  const selectRef = useRef<any>();

  const [options, setOptions] = useState(convertToOptions(items));
  const formatOptionLabel = useMemo(() => getFormatOptionLabel(
    innerTheme,
    appearance,
    baseAppearance,
    isRTL,
  ), [appearance, baseAppearance, innerTheme, isRTL]);

  const [currentOption, setCurrentOption] = useState(findOptionByValue(value, options));

  useEffect(() => {
    setOptions(convertToOptions(items));
  }, [items]);

  useEffect(() => {
    setCurrentOption(findOptionByValue(value, options));
  }, [options, value]);

  const styles = useRef(themeConverter(
    innerTheme,
    appearance,
    baseAppearance,
    shouldFitContainer,
  ));

  useEffect(() => {
    styles.current = themeConverter(
      innerTheme,
      appearance,
      baseAppearance,
      shouldFitContainer,
    );
  }, [innerTheme, appearance, baseAppearance, shouldFitContainer]);


  const onItemChanged = useCallback((selectedOption, action) => {
    setCurrentOption(selectedOption);

    if (onChange) {
      const selectedValue = !isMulti && selectedOption ? selectedOption.value : selectedOption;

      onChange(selectedValue, action);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      ref={ selectRef }
      className={ className }
      classNamePrefix={ className }
      value={ currentOption }
      onChange={ onItemChanged }
      options={ options }
      formatOptionLabel={ formatOptionLabel }
      styles={ styles.current }
      isDisabled={ disabled }
      isMulti={ isMulti }
      isSearchable={ isSearchable }
      isRtl={ isRTL }
      controlShouldRenderValue={ isControlShouldRenderValue }
      closeMenuOnSelect={ isCloseMenuOnSelect }
      hideSelectedOptions={ isHideSelectedOptions }
      placeholder={ placeholder }
      components={ {
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        ...components,
      } }
      { ...rest }
    />
  );
});

export default PureSelect;
