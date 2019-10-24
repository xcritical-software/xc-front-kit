import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import Select from 'react-select';

import { selectThemeNamespace, selectThemeStyle } from './theme';
import { getStyles, getFormatOptionLabel } from './styled/Select';
import DropdownIndicator from './styled/DropdownIndicator';
import { convertToOptions, findOptionByValue } from './utils/utils';


const propTypes = {
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isOpenMenu: PropTypes.bool,
  theme: PropTypes.object,
  appearance: PropTypes.string,
  baseAppearance: PropTypes.string,
  items: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  ),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    ],
  ),
  className: PropTypes.string,
  shouldFitContainer: PropTypes.bool,
  isRTL: PropTypes.bool,
  isCloseMenuOnSelect: PropTypes.bool,
  isHideSelectedOptions: PropTypes.bool,
  isControlShouldRenderValue: PropTypes.bool,
  textPosition: PropTypes.string,
  placeholder: PropTypes.string,
};

const defaultProps = {
  value: null,
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
  disabled,
  isMulti,
  isSearchable,
  isOpenMenu,
  isRTL,
  isCloseMenuOnSelect,
  isHideSelectedOptions,
  isControlShouldRenderValue,
  appearance,
  baseAppearance,
  items,
  value,
  placeholder,
  onChange,
  theme,
  ...rest
}) => {
  const selectRef = useRef();
  const options = useRef(convertToOptions(items));
  const formatOptionLabel = useRef(getFormatOptionLabel({
    theme, appearance, baseAppearance, isRTL,
  }));

  const [currentOption, setCurrentOption] = useState(findOptionByValue(value, options.current));

  useEffect(() => {
    options.current = convertToOptions(items);
  }, [items]);

  useEffect(() => {
    setCurrentOption(findOptionByValue(value, options.current));
  }, [value]);

  const styles = useRef(getStyles({
    theme, appearance, baseAppearance, isRTL, ...rest,
  }));

  useEffect(() => {
    styles.current = getStyles({
      theme, appearance, baseAppearance, isRTL, ...rest,
    });

    formatOptionLabel.current = getFormatOptionLabel({
      theme, appearance, baseAppearance, isRTL,
    });
  }, [
    theme,
    appearance,
    baseAppearance,
    isRTL,
    rest,
  ]);

  const onItemChanged = useCallback((selectedOption) => {
    setCurrentOption(selectedOption);

    if (onChange) {
      const selectedValue = !isMulti && selectedOption ? selectedOption.value : selectedOption;

      onChange(selectedValue);
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

PureSelect.propTypes = propTypes;
PureSelect.defaultProps = defaultProps;

export default PureSelect;
