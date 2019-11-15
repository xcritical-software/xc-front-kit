import React, {
  useRef, useEffect, useContext, useMemo,
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
  placeholder,
  theme,
  components,
  ...rest
}) => {
  const themeContext = useContext<IThemeNamespace<ISelectBaseTheme>>(ThemeContext);
  const innerTheme = theme || themeContext || {};

  const selectRef = useRef<any>();

  const formatOptionLabel = useMemo(() => getFormatOptionLabel(
    innerTheme,
    appearance,
    baseAppearance,
    isRTL,
  ), [appearance, baseAppearance, innerTheme, isRTL]);

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


  return (
    <Select
      ref={ selectRef }
      className={ className }
      classNamePrefix={ className }
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
