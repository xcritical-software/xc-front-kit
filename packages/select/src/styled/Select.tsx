import React from 'react';

import {
  getDisplayStyles,
  getPaddingStyles,
  getMarginStyles,
  getFontStyles,
  getBorderStyles,
  getWidthStyles,
  getHeightStyles,
  getBorderRadiusStyles,
  getCommonStyles,
  getStatesStyles,
} from '../utils';


const labelCSS = ({ context }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  top: context === 'value' ? '1px' : '0',
});

const textCSS = ({ isRTL, ...rest }) => {
  let paddingRight;
  let paddingLeft;

  const padding = getPaddingStyles(rest)({ elementName: 'labelText' });

  if (isRTL) {
    paddingRight = (padding && padding.paddingRight) || 0;
  } else {
    paddingLeft = (padding && padding.paddingLeft) || 0;
  }

  return {
    paddingLeft,
    paddingRight,
  };
};

const Option = (opt) => (
  <div style={ labelCSS({ ...opt }) }>
    <span>{ opt.icon }</span>
    <span style={ textCSS({ ...opt }) }>{ opt.children }</span>
  </div>
);

export const getFormatOptionLabel = ({
  theme, appearance, baseAppearance, isRTL,
}) => (opt, { context }) => (
  <Option
    theme={ theme }
    appearance={ appearance }
    baseAppearance={ baseAppearance }
    icon={ opt.icon }
    context={ context }
    isRTL={ isRTL }
  >
    { opt.label }
  </Option>
);

export const getStyles = (props) => {
  const getElementStyles = getCommonStyles(props);
  const getInteractiveStyles = getStatesStyles(props);
  const getDisplay = getDisplayStyles(props);
  const getPadding = getPaddingStyles(props);
  const getMargin = getMarginStyles(props);
  const getFont = getFontStyles(props);
  const getBorder = getBorderStyles(props);
  const getBorderRadius = getBorderRadiusStyles(props);
  const getWidth = getWidthStyles(props);
  const getHeight = getHeightStyles(props);

  const styles = {
    container: (css) => ({
      ...css,
      ...getFont({ elementName: 'container' }),
      ...getWidth({ elementName: 'container' }),
      ...getMargin({ elementName: 'container' }),
    }),
    control: (css, state) => ({
      ...css,
      ...getHeight({ elementName: 'button' }),
      ...getBorder({ elementName: 'button' }),
      ...getPadding({ elementName: 'button' }),
      ...getBorderRadius({ elementName: 'button' }),
      ...getElementStyles({ elementName: 'button', ...props }),
      ...getInteractiveStyles({ elementName: 'button', ...state, ...props }),
    }),
    input: (css, state) => ({
      ...css,
      ...getElementStyles({ elementName: 'input', ...props }),
      ...getInteractiveStyles({ elementName: 'input', ...state, ...props }),
    }),
    placeholder: (css, state) => ({
      ...css,
      ...getFont({ elementName: 'placeholder' }),
      ...getElementStyles({ elementName: 'placeholder', ...props }),
      ...getInteractiveStyles({ elementName: 'placeholder', ...state, ...props }),
    }),

    group: (css) => ({
      ...css,
    }),
    groupHeading: (css) => ({
      ...css,
    }),

    indicatorsContainer: (css, state) => ({
      ...css,
      ...getPadding({ elementName: 'indicatorsContainer' }),
      ...getMargin({ elementName: 'indicatorsContainer' }),
      ...getElementStyles({ elementName: 'indicatorsContainer', ...props }),
      ...getInteractiveStyles({ elementName: 'indicatorsContainer', ...state, ...props }),
    }),
    indicatorSeparator: (css) => ({
      ...css,
      ...getDisplay({ elementName: 'indicatorSeparator' }),
    }),
    dropdownIndicator: (css, state) => ({
      ...css,
      ...getPadding({ elementName: 'dropdownIndicator' }),
      ...getElementStyles({ elementName: 'dropdownIndicator', ...props }),
      ...getInteractiveStyles({ elementName: 'dropdownIndicator', ...state, ...props }),
    }),
    clearIndicator: (css, state) => ({
      ...css,
      ...getPadding({ elementName: 'clearIndicator' }),
      ...getElementStyles({ elementName: 'clearIndicator', ...props }),
      ...getInteractiveStyles({ elementName: 'clearIndicator', ...state, ...props }),
    }),
    loadingIndicator: (css, state) => ({
      ...css,
      ...getPadding({ elementName: 'loadingIndicator' }),
      ...getElementStyles({ elementName: 'loadingIndicator', ...props }),
      ...getInteractiveStyles({ elementName: 'loadingIndicator', ...state, ...props }),
    }),
    loadingMessage: (css, state) => ({
      ...css,
      ...getFont({ elementName: 'loadingMessage' }),
      ...getElementStyles({ elementName: 'loadingMessage', ...props }),
      ...getInteractiveStyles({ elementName: 'loadingMessage', ...state, ...props }),
    }),

    menu: (css, state) => ({
      ...css,
      ...getElementStyles({ elementName: 'dropdown', ...props }),
      ...getInteractiveStyles({ elementName: 'dropdown', ...state, ...props }),
    }),
    menuList: (css, state) => ({
      ...css,
      ...getPadding({ elementName: 'dropdownList' }),
      ...getBorderRadius({ elementName: 'dropdownList' }),
      ...getElementStyles({ elementName: 'dropdownList', ...props }),
      ...getInteractiveStyles({ elementName: 'dropdownList', ...state, ...props }),
    }),
    menuPortal: (css) => ({
      ...css,
    }),
    option: (css, state) => ({
      ...css,
      ...getPadding({ elementName: 'option' }),
      ...getFont({ elementName: 'option' }),
      ...getElementStyles({ elementName: 'option', ...props }),
      ...getInteractiveStyles({ elementName: 'option', ...state, ...props }),
    }),
    noOptionsMessage: (css, state) => ({
      ...css,
      ...getFont({ elementName: 'noOptionsMessage' }),
      ...getElementStyles({ elementName: 'noOptionsMessage', ...props }),
      ...getInteractiveStyles({ elementName: 'noOptionsMessage', ...state, ...props }),
    }),

    valueContainer: (css, state) => ({
      ...css,
      ...getDisplay({ elementName: 'valueContainer' }),
      ...getWidth({ elementName: 'valueContainer' }),
      ...getElementStyles({ elementName: 'valueContainer', ...props }),
      ...getInteractiveStyles({ elementName: 'valueContainer', ...state, ...props }),
    }),
    singleValue: (css, state) => ({
      ...css,
      ...getDisplay({ elementName: 'singleValue' }),
      ...getFont({ elementName: 'singleValue' }),
      ...getElementStyles({ elementName: 'singleValue', ...props }),
      ...getInteractiveStyles({ elementName: 'singleValue', ...state, ...props }),
    }),
    multiValue: (css, state) => ({
      ...css,
      ...getDisplay({ elementName: 'multiValue' }),
      ...getFont({ elementName: 'multiValue' }),
      ...getElementStyles({ elementName: 'multiValue', ...props }),
      ...getInteractiveStyles({ elementName: 'multiValue', ...state, ...props }),
    }),
    multiValueLabel: (css, state) => ({
      ...css,
      ...getFont({ elementName: 'multiValueLabel' }),
      ...getElementStyles({ elementName: 'multiValueLabel', ...props }),
      ...getInteractiveStyles({ elementName: 'multiValueLabel', ...state, ...props }),
    }),
    multiValueRemove: (css, state) => ({
      ...css,
      ...getElementStyles({ elementName: 'multiValueRemove', ...props }),
      ...getInteractiveStyles({ elementName: 'multiValueRemove', ...state, ...props }),
    }),
  };

  return styles;
};
