import { StylesConfig } from 'react-select/src/styles';
import { CSSObject } from 'styled-components';

import { IThemeNamespace } from '@xcritical/theme';

import { ISelectBaseTheme } from '../interfaces';

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

interface IStylesConfigCustom extends StylesConfig {
  menuScrollbar: CSSObject;
}

export const themeConverter = (
  theme: IThemeNamespace<ISelectBaseTheme>,
  appearance: string,
  baseAppearance: string,
  shouldFitContainer: boolean
): IStylesConfigCustom => {
  const getElementStyles = getCommonStyles(theme, appearance, baseAppearance);
  const getInteractiveStyles = getStatesStyles(
    theme,
    appearance,
    baseAppearance
  );
  const getDisplay = getDisplayStyles(theme, appearance, baseAppearance);
  const getPadding = getPaddingStyles(theme, appearance, baseAppearance);
  const getMargin = getMarginStyles(theme, appearance, baseAppearance);
  const getBorderRadius = getBorderRadiusStyles(
    theme,
    appearance,
    baseAppearance
  );
  const getWidth = getWidthStyles(theme, appearance, baseAppearance);
  const getHeight = getHeightStyles(theme, appearance, baseAppearance);

  const styles: IStylesConfigCustom = {
    container: (css) => ({
      ...css,
      ...getElementStyles('container'),
      ...getWidth('container', shouldFitContainer),
      ...getMargin('container'),
      ...getBorderRadius('container'),
    }),
    control: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('button'),
      ...getHeight('button'),
      ...getPadding('button'),
      ...getBorderRadius('button'),
      ...getInteractiveStyles(
        'button',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    input: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('input'),
      ...getMargin('input'),
      ...getPadding('input'),
      ...getInteractiveStyles(
        'input',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    placeholder: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('placeholder'),
      ...getInteractiveStyles(
        'placeholder',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    group: (css) => ({
      ...css,
      ...getElementStyles('group'),
    }),
    groupHeading: (css) => ({
      ...css,
      ...getElementStyles('groupHeading'),
    }),
    indicatorsContainer: (
      css,
      { isDisabled, isFocused, isSelected, hasValue }
    ) => ({
      ...css,
      ...getElementStyles('indicatorsContainer'),
      ...getPadding('indicatorsContainer'),
      ...getMargin('indicatorsContainer'),
      ...getInteractiveStyles(
        'indicatorsContainer',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    indicatorSeparator: (css) => ({
      ...css,
      ...getElementStyles('indicatorSeparator'),
      ...getPadding('indicatorSeparator'),
      ...getMargin('indicatorSeparator'),
      ...getElementStyles('indicatorSeparator'),
      ...getDisplay('indicatorSeparator'),
    }),
    dropdownIndicator: (
      css,
      { isDisabled, isFocused, isSelected, hasValue }
    ) => ({
      ...css,
      ...getElementStyles('dropdownIndicator'),
      ...getPadding('dropdownIndicator'),
      ...getInteractiveStyles(
        'dropdownIndicator',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    clearIndicator: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getPadding('clearIndicator'),
      ...getElementStyles('clearIndicator'),
      ...getInteractiveStyles(
        'clearIndicator',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    loadingIndicator: (
      css,
      { isDisabled, isFocused, isSelected, hasValue }
    ) => ({
      ...css,
      ...getPadding('loadingIndicator'),
      ...getElementStyles('loadingIndicator'),
      ...getInteractiveStyles(
        'loadingIndicator',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    loadingMessage: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('loadingMessage'),
      ...getInteractiveStyles(
        'loadingMessage',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),

    menu: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('dropdown'),
      ...getInteractiveStyles(
        'dropdown',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    menuList: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getPadding('dropdownList'),
      ...getBorderRadius('dropdownList'),
      ...getElementStyles('dropdownList'),
      ...getInteractiveStyles(
        'dropdownList',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    menuScrollbar: {
      ...getElementStyles('menuScrollbar'),
      ...getInteractiveStyles('menuScrollbar'),
    },
    menuPortal: (css) => ({
      ...css,
    }),
    option: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getPadding('option'),
      ...getElementStyles('option'),
      ...getInteractiveStyles(
        'option',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    noOptionsMessage: (
      css,
      { isDisabled, isFocused, isSelected, hasValue }
    ) => ({
      ...css,
      ...getElementStyles('noOptionsMessage'),
      ...getInteractiveStyles('noOptionsMessage', {
        isDisabled,
        isFocused,
        isSelected,
        hasValue,
      }),
    }),

    valueContainer: (
      css,
      {
        isDisabled,
        isFocused,
        isSelected,
        hasValue,
        selectProps: { isSearchable },
      }
    ) => ({
      ...css,
      ...getElementStyles('valueContainer'),
      ...getPadding('valueContainer'),
      ...getDisplay('valueContainer'),
      ...getWidth('valueContainer'),
      ...getInteractiveStyles(
        'valueContainer',
        isDisabled,
        isFocused,
        isSelected,
        hasValue,
        isSearchable
      ),
    }),
    singleValue: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('singleValue'),
      ...getDisplay('singleValue'),
      ...getInteractiveStyles(
        'singleValue',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    multiValue: (css, { isDisabled, isFocused, isSelected, hasValue }) => ({
      ...css,
      ...getElementStyles('multiValue'),
      ...getDisplay('multiValue'),
      ...getPadding('multiValue'),
      ...getMargin('multiValue'),
      ...getInteractiveStyles(
        'multiValue',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    multiValueLabel: (
      css,
      { isDisabled, isFocused, isSelected, hasValue }
    ) => ({
      ...css,
      ...getElementStyles('multiValueLabel'),
      ...getPadding('multiValueLabel'),
      ...getMargin('multiValueLabel'),
      ...getInteractiveStyles(
        'multiValueLabel',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
    multiValueRemove: (
      css,
      { isDisabled, isFocused, isSelected, hasValue }
    ) => ({
      ...css,
      ...getElementStyles('multiValueRemove'),
      ...getPadding('multiValueRemove'),
      ...getMargin('multiValueRemove'),
      ...getInteractiveStyles(
        'multiValueRemove',
        isDisabled,
        isFocused,
        isSelected,
        hasValue
      ),
    }),
  };

  return styles;
};
