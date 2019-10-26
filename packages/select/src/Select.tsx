import React, {
  useState, useRef, useEffect, useCallback, useContext,
} from 'react';
import Select from 'react-select';

import { ThemeContext } from 'styled-components';
import { IThemeNamespace } from '@xcritical/theme';
import { selectThemeNamespace, selectThemeStyle } from './theme';
import { getStyles, getFormatOptionLabel } from './styled/Select';
import DropdownIndicator from './styled/DropdownIndicator';
import { convertToOptions, findOptionByValue } from './utils/utils';
import { SelectProps, ISelectTheme } from './interfaces';


const defaultProps = {
  disabled: false,
  isMulti: false,
  isSearchable: false,
  isOpenMenu: false,
  className: null,
  items: {},
  shouldFitContainer: false,
  isRTL: false,
  isCloseMenuOnSelect: true,
  isHideSelectedOptions: true,
  isControlShouldRenderValue: true,
  appearance: 'default',
  baseAppearance: 'default',
  textPosition: 'left',
  placeholder: 'Select...',
  theme: {
    [selectThemeNamespace]: selectThemeStyle,
  },
  onChange: () => {},
};

export const PureSelect = ({
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
  theme = {
    [selectThemeNamespace]: selectThemeStyle,
  },
  ...rest
}: SelectProps): React.ReactElement<SelectProps> => {
  const themeContext = useContext<IThemeNamespace<ISelectTheme>>(ThemeContext);
  const innerTheme = theme || themeContext;

  const selectRef = useRef<any>();
  const options = useRef(convertToOptions(items));
  const formatOptionLabel = useRef(getFormatOptionLabel(
    innerTheme,
    appearance,
    baseAppearance,
    isRTL,
  ));

  const [currentOption, setCurrentOption] = useState(findOptionByValue(value, options.current));

  useEffect(() => {
    options.current = convertToOptions(items);
  }, [items]);

  useEffect(() => {
    setCurrentOption(findOptionByValue(value, options.current));
  }, [value]);

  const styles = useRef(getStyles(
    innerTheme,
    appearance,
    baseAppearance,
    shouldFitContainer,
  ));

  useEffect(() => {
    styles.current = getStyles(
      innerTheme,
      appearance,
      baseAppearance,
      shouldFitContainer,
    );
  }, [innerTheme, appearance, baseAppearance, shouldFitContainer]);

  useEffect(() => {
    formatOptionLabel.current = getFormatOptionLabel(
      innerTheme,
      appearance,
      baseAppearance,
      isRTL,
    );
  }, [innerTheme, appearance, baseAppearance, isRTL]);


  const onItemChanged = useCallback((selectedOption, action) => {
    setCurrentOption(selectedOption);

    if (onChange) {
      const selectedValue = !isMulti && selectedOption ? selectedOption.value : selectedOption;

      onChange(selectedValue, action);
    }
  }, [isMulti, onChange]);

  return (
    <Select
      ref={ selectRef }
      className={ className }
      value={ currentOption }
      onChange={ onItemChanged }
      options={ options.current }
      formatOptionLabel={ formatOptionLabel.current }
      styles={ styles.current }
      isDisabled={ disabled }
      isMulti={ isMulti }
      isSearchable={ isSearchable }
      isRtl={ isRTL }
      controlShouldRenderValue={ isControlShouldRenderValue }
      closeMenuOnSelect={ isCloseMenuOnSelect }
      hideSelectedOptions={ isHideSelectedOptions }
      placeholder={ placeholder }
      components={ { DropdownIndicator } }
      { ...rest }
    />
  );
};

PureSelect.defaultProps = defaultProps;

export default PureSelect;
