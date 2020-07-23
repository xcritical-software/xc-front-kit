import { StylesConfig } from 'react-select/src/styles';

import { IThemeNamespace } from '@xcritical/theme';

import {
  ISelectBaseTheme,
} from '../interfaces';

import {
  getDisplayStyles,
  getPaddingStyles,
  getMarginStyles,
  getWidthStyles,
  getHeightStyles,
  getBorderRadiusStyles,
  getCommonStyles,
  getStatesStyles,
} from './getStyles';


export const themeConverter = (
  theme: IThemeNamespace<ISelectBaseTheme>,
  appearance: string,
  baseAppearance: string,
  shouldFitContainer: boolean,
): StylesConfig => {
  const getElementStyles = getCommonStyles(theme, appearance, baseAppearance);
  const getInteractiveStyles = getStatesStyles(theme, appearance, baseAppearance);
  const getDisplay = getDisplayStyles(theme, appearance, baseAppearance);
  const getPadding = getPaddingStyles(theme, appearance, baseAppearance);
  const getMargin = getMarginStyles(theme, appearance, baseAppearance);
  const getBorderRadius = getBorderRadiusStyles(theme, appearance, baseAppearance);
  const getWidth = getWidthStyles(theme, appearance, baseAppearance);
  const getHeight = getHeightStyles(theme, appearance, baseAppearance);

  const styles: StylesConfig = {
    container: (css) => ({
      ...css,
      ...getElementStyles('container'),
      ...getWidth('container', shouldFitContainer),
      ...getMargin('container'),
      ...getBorderRadius('container'),
    }),
    control: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('button'),
      ...getHeight('button'),
      ...getPadding('button'),
      ...getBorderRadius('button'),
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
      ...getElementStyles('placeholder'),
      ...getInteractiveStyles('placeholder', isDisabled, isFocused, isSelected),
    }),
    group: (css) => ({
      ...css,
      ...getElementStyles('group'),
    }),
    groupHeading: (css) => ({
      ...css,
      ...getElementStyles('groupHeading'),
    }),
    indicatorsContainer: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('indicatorsContainer'),
      ...getPadding('indicatorsContainer'),
      ...getMargin('indicatorsContainer'),
      ...getInteractiveStyles('indicatorsContainer', isDisabled, isFocused, isSelected),
    }),
    indicatorSeparator: (css) => ({
      ...css,
      ...getElementStyles('indicatorSeparator'),
      ...getPadding('indicatorSeparator'),
      ...getMargin('indicatorSeparator'),
      ...getElementStyles('indicatorSeparator'),
      ...getDisplay('indicatorSeparator'),
    }),
    dropdownIndicator: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('dropdownIndicator'),
      ...getPadding('dropdownIndicator'),
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
      ...getElementStyles('option'),
      ...getInteractiveStyles('option', isDisabled, isFocused, isSelected),
    }),
    noOptionsMessage: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('noOptionsMessage'),
      ...getInteractiveStyles('noOptionsMessage', isDisabled, isFocused, isSelected),
    }),

    valueContainer: (css, {
      isDisabled, isFocused, isSelected, selectProps: { isSearchable },
    }) => ({
      ...css,
      ...getElementStyles('valueContainer'),
      ...getPadding('valueContainer'),
      ...getDisplay('valueContainer'),
      ...getWidth('valueContainer'),
      ...getInteractiveStyles('valueContainer', isDisabled, isFocused, isSelected, isSearchable),
    }),
    singleValue: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('singleValue'),
      ...getDisplay('singleValue'),
      ...getInteractiveStyles('singleValue', isDisabled, isFocused, isSelected),
    }),
    multiValue: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
      ...getElementStyles('multiValue'),
      ...getDisplay('multiValue'),
      ...getPadding('multiValue'),
      ...getMargin('multiValue'),
      ...getInteractiveStyles('multiValue', isDisabled, isFocused, isSelected),
    }),
    multiValueLabel: (css, { isDisabled, isFocused, isSelected }) => ({
      ...css,
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
