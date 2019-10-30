import { StylesConfig } from 'react-select/src/styles';
import { IThemeNamespace, ITheme } from '@xcritical/theme';

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
} from './getStyles';
import {
  ISelectBaseTheme,
} from '../interfaces';


export const themeConverter = (
  theme: IThemeNamespace<ITheme<ISelectBaseTheme>>,
  appearance: string,
  baseAppearance: string,
  shouldFitContainer: boolean,
): StylesConfig => {
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
      ...getMargin('input'),
      ...getPadding('input'),
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
      ...getMargin('indicatorsContainer'),
      ...getElementStyles('indicatorsContainer'),
      ...getInteractiveStyles('indicatorsContainer', isDisabled, isFocused, isSelected),
    }),
    indicatorSeparator: (css) => ({
      ...css,
      ...getPadding('indicatorSeparator'),
      ...getMargin('indicatorSeparator'),
      ...getElementStyles('indicatorSeparator'),
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
      ...getPadding('valueContainer'),
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
      ...getPadding('multiValue'),
      ...getMargin('multiValue'),
      ...getInteractiveStyles('multiValue', isDisabled, isFocused, isSelected),
    }),
    multiValueLabel: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getFont('multiValueLabel'),
      ...getElementStyles('multiValueLabel'),
      ...getPadding('multiValueLabel'),
      ...getMargin('multiValueLabel'),
      ...getInteractiveStyles('multiValueLabel', isDisabled, isFocused, isSelected),
    }),
    multiValueRemove: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('multiValueRemove'),
      ...getPadding('multiValueRemove'),
      ...getMargin('multiValueRemove'),
      ...getInteractiveStyles('multiValueRemove', isDisabled, isFocused, isSelected),
    }),
  };

  return styles;
};
