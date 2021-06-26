import React, {
  useContext, useMemo, memo, forwardRef,
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
import { themeConverter } from './utils';
import { SelectProps, ISelectBaseTheme } from './interfaces';
import { MenuList } from './styled/MenuList';


export const PureSelect: React.FC<SelectProps> = memo(forwardRef<any, SelectProps>(({
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
  placeholder,
  theme,
  components,
  styles,
  onChange,
  ...rest
}, ref) => {
  const themeContext = useContext<IThemeNamespace<ISelectBaseTheme>>(ThemeContext);
  const innerTheme = (theme ?? themeContext) || {};

  const formatOptionLabel = useMemo(() => getFormatOptionLabel(
    innerTheme,
    appearance,
    baseAppearance,
    isRTL,
  ), [appearance, baseAppearance, innerTheme, isRTL]);

  const selectStyles = useMemo(
    () => themeConverter(
      innerTheme,
      appearance,
      baseAppearance,
      shouldFitContainer,
    ),
    [innerTheme, appearance, baseAppearance, shouldFitContainer],
  );

  return (
    <Select
      ref={ ref }
      className={ className }
      classNamePrefix={ className }
      formatOptionLabel={ formatOptionLabel }
      styles={ { ...selectStyles, ...styles } }
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
        MenuList,
        ...components,
      } }
      onChange={ (value, action) => {
        if (!onChange) return;

        // Fixed react-select behaviour: https://github.com/JedWatson/react-select/issues/3632
        if (isMulti && value === null) onChange([], action);
        else onChange(value, action);
      } }
      { ...rest }
    />
  );
}));

export default PureSelect;
