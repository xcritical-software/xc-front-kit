/* eslint-disable import/no-unresolved */
import React, {
  useRef,
  useContext,
  useMemo,
  ReactElement,
  useCallback,
} from 'react';
import Select, {
  GroupBase,
  OnChangeValue,
  SelectComponentsConfig,
} from 'react-select';
import { ThemeContext } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';

import {
  DropdownIndicator,
  ClearIndicator,
  MultiValueRemove,
  MenuList,
  getFormatOptionLabel,
} from './styled';
import { themeConverter } from './utils';
import { ISelectBaseTheme, SelectProps } from './interfaces';

export const PureSelect = function <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  className,
  disabled = false,
  isMulti,
  isSearchable = false,
  isRTL = false,
  isCloseMenuOnSelect = true,
  isHideSelectedOptions = true,
  isControlShouldRenderValue = true,
  appearance = 'default',
  baseAppearance = 'default',
  shouldFitContainer = false,
  theme,
  components,
  styles,
  onChange,
  ...rest
}: SelectProps<Option, IsMulti, Group>): ReactElement {
  const themeContext = useContext<IThemeNamespace<ISelectBaseTheme>>(
    ThemeContext
  );
  const innerTheme = (theme ?? themeContext) || {};
  const selectRef = useRef<any>();

  const formatOptionLabel = useMemo(
    () => getFormatOptionLabel(innerTheme, appearance, baseAppearance, isRTL),
    [appearance, baseAppearance, innerTheme, isRTL]
  );

  const selectStyles = useMemo(
    () =>
      themeConverter<Option, IsMulti, Group>(
        innerTheme,
        appearance,
        baseAppearance,
        shouldFitContainer
      ),
    [innerTheme, appearance, baseAppearance, shouldFitContainer]
  );

  const innerOnChange = useCallback(
    (value: OnChangeValue<Option, IsMulti>, action) => {
      if (!onChange) return;

      // Fixed react-select behaviour: https://github.com/JedWatson/react-select/issues/3632
      if (isMulti === true && value === null) {
        onChange([] as any, action);
      } else onChange(value, action);
    },
    [onChange, isMulti]
  );

  const _components: SelectComponentsConfig<Option, IsMulti, Group> = {
    DropdownIndicator,
    ClearIndicator,
    MultiValueRemove,
    MenuList,
    ...components,
  };

  return (
    <Select
      ref={selectRef}
      className={className}
      classNamePrefix={className}
      formatOptionLabel={formatOptionLabel}
      styles={{ ...selectStyles, ...styles }}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isRtl={isRTL}
      controlShouldRenderValue={isControlShouldRenderValue}
      closeMenuOnSelect={isCloseMenuOnSelect}
      hideSelectedOptions={isHideSelectedOptions}
      components={_components}
      onChange={innerOnChange}
      {...rest}
    />
  );
};

export default PureSelect;
