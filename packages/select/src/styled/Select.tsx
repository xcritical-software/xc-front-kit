import React, { CSSProperties } from 'react';

import { StylesConfig } from 'react-select/src/styles';
import { FormatOptionLabelMeta, FormatOptionLabelContext } from 'react-select/src/Select';
import { OptionTypeBase } from 'react-select/src/types';
import { IThemeNamespace } from '@xcritical/theme';
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
import {
  IOptionProps, SelectTheme,
} from '../interfaces';


const labelCSS = (context: FormatOptionLabelContext): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  top: context === 'value' ? '1px' : '0',
});

const textCSS = (
  isRTL: boolean,
  theme: IThemeNamespace<SelectTheme>,
  appearance: string,
  baseAppearance: string,
): CSSProperties => {
  let paddingRight;
  let paddingLeft;

  const padding = getPaddingStyles(theme, appearance, baseAppearance)('labelText');

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

const Option: React.FC<IOptionProps> = ({
  context,
  icon,
  children,
  isRTL,
  theme = {},
  appearance = 'default',
  baseAppearance = 'default',
}) => (
  <div style={ labelCSS(context) }>
    <span>{ icon }</span>
    <span style={ textCSS(isRTL, theme, appearance, baseAppearance) }>{ children }</span>
  </div>
);

export const getFormatOptionLabel = (
  theme: IThemeNamespace<SelectTheme>,
  appearance: string,
  baseAppearance: string,
  isRTL: boolean,
) => (
  opt: OptionTypeBase,
  { context }: FormatOptionLabelMeta<IOptionProps>,
) => (
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

export const getStyles = (
  theme: IThemeNamespace<SelectTheme>,
  appearance: string,
  baseAppearance: string,
  shouldFitContainer: boolean,
): any => {
  const getElementStyles = getCommonStyles(theme, appearance, baseAppearance);
  const getInteractiveStyles = getStatesStyles(theme, appearance, baseAppearance);
  const getDisplay = getDisplayStyles(theme, appearance, baseAppearance);
  const getPadding = getPaddingStyles(theme, appearance, baseAppearance);
  const getMargin = getMarginStyles(theme, appearance, baseAppearance);
  const getFont = getFontStyles(theme, appearance, baseAppearance);
  const getBorder = getBorderStyles(theme, appearance, baseAppearance);
  const getBorderRadius = getBorderRadiusStyles(theme, appearance, baseAppearance);
  const getWidth = getWidthStyles(theme, appearance, baseAppearance);
  const getHeight = getHeightStyles(theme, appearance, baseAppearance);

  const styles: StylesConfig = {
    container: (css) => ({
      ...css,
      ...getFont('container'),
      ...getWidth('container', shouldFitContainer),
      ...getMargin('container'),
    }),
    control: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getHeight('button'),
      ...getBorder('button'),
      ...getPadding('button'),
      ...getBorderRadius('button'),
      ...getElementStyles('button'),
      ...getInteractiveStyles('button', isDisabled, isFocused, isSelected),
    }),
    input: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('input'),
      ...getInteractiveStyles('input', isDisabled, isFocused, isSelected),
    }),
    placeholder: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getFont('placeholder'),
      ...getElementStyles('placeholder'),
      ...getInteractiveStyles('placeholder', isDisabled, isFocused, isSelected),
    }),

    group: (css) => ({
      ...css,
    }),
    groupHeading: (css) => ({
      ...css,
    }),

    indicatorsContainer: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getPadding('indicatorsContainer'),
      ...getMargin('indicatorsntainer'),
      ...getElementStyles('indicatorsContainer'),
      ...getInteractiveStyles('indicatorsContainer', isDisabled, isFocused, isSelected),
    }),
    indicatorSeparator: (css) => ({
      ...css,
      ...getDisplay('indicatorSeparator'),
    }),
    dropdownIndicator: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getPadding('dropdownIndicator'),
      ...getElementStyles('dropdownIndicator'),
      ...getInteractiveStyles('dropdownIndicator', isDisabled, isFocused, isSelected),
    }),
    clearIndicator: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getPadding('clearIndicator'),
      ...getElementStyles('clearIndicator'),
      ...getInteractiveStyles('clearIndicator', isDisabled, isFocused, isSelected),
    }),
    loadingIndicator: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getPadding('loadingIndicator'),
      ...getElementStyles('loadingIndicator'),
      ...getInteractiveStyles('loadingIndicator', isDisabled, isFocused, isSelected),
    }),
    loadingMessage: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getFont('loadingMessage'),
      ...getElementStyles('loadingMessage'),
      ...getInteractiveStyles('loadingMessage', isDisabled, isFocused, isSelected),
    }),

    menu: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('dropdown'),
      ...getInteractiveStyles('dropdown', isDisabled, isFocused, isSelected),
    }),
    menuList: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getPadding('dropdownList'),
      ...getBorderRadius('dropdownList'),
      ...getElementStyles('dropdownList'),
      ...getInteractiveStyles('dropdownList', isDisabled, isFocused, isSelected),
    }),
    menuPortal: (css) => ({
      ...css,
    }),
    option: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getPadding('option'),
      ...getFont('option'),
      ...getElementStyles('option'),
      ...getInteractiveStyles('option', isDisabled, isFocused, isSelected),
    }),
    noOptionsMessage: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getFont('noOptionsMessage'),
      ...getElementStyles('noOptionsMessage'),
      ...getInteractiveStyles('noOptionsMessage', isDisabled, isFocused, isSelected),
    }),

    valueContainer: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getDisplay('valueContainer'),
      ...getWidth('valueContainer'),
      ...getElementStyles('valueContainer'),
      ...getInteractiveStyles('valueContainer', isDisabled, isFocused, isSelected),
    }),
    singleValue: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getDisplay('singleValue'),
      ...getFont('singleValue'),
      ...getElementStyles('singleValue'),
      ...getInteractiveStyles('singleValue', isDisabled, isFocused, isSelected),
    }),
    multiValue: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getDisplay('multiValue'),
      ...getFont('multiValue'),
      ...getElementStyles('multiValue'),
      ...getInteractiveStyles('multiValue', isDisabled, isFocused, isSelected),
    }),
    multiValueLabel: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getFont('multiValueLabel'),
      ...getElementStyles('multiValueLabel'),
      ...getInteractiveStyles('multiValueLabel', isDisabled, isFocused, isSelected),
    }),
    multiValueRemove: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('multiValueRemove'),
      ...getInteractiveStyles('multiValueRemove', isDisabled, isFocused, isSelected),
    }),
  };

  return styles;
};
