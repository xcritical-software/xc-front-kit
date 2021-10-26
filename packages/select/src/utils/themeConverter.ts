import { CSSObject } from 'styled-components';
import { GroupBase, StylesConfig } from 'react-select';

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

export interface IStylesConfigCustom<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends StylesConfig<Option, IsMulti, Group> {
  menuScrollbar: CSSObject;
}

export const themeConverter = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  theme: IThemeNamespace<ISelectBaseTheme>,
  appearance: string,
  baseAppearance: string,
  shouldFitContainer: boolean
) => {
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

  const styles: IStylesConfigCustom<Option, IsMulti, Group> = {
    container: (css) => ({
      ...css,
      ...getElementStyles('container'),
      ...getWidth('container', shouldFitContainer),
      ...getMargin('container'),
      ...getBorderRadius('container'),
    }),
    control: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getElementStyles('button'),
      ...getHeight('button'),
      ...getPadding('button'),
      ...getBorderRadius('button'),
      ...getInteractiveStyles('button', isDisabled, isFocused, false, hasValue),
    }),
    input: (css, { isDisabled, hasValue }) => ({
      ...css,
      ...getElementStyles('input'),
      ...getMargin('input'),
      ...getPadding('input'),
      ...getInteractiveStyles('input', isDisabled, false, false, hasValue),
    }),
    placeholder: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getElementStyles('placeholder'),
      ...getInteractiveStyles(
        'placeholder',
        isDisabled,
        isFocused,
        false,
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
    indicatorsContainer: (css, { isDisabled, hasValue }) => ({
      ...css,
      ...getElementStyles('indicatorsContainer'),
      ...getPadding('indicatorsContainer'),
      ...getMargin('indicatorsContainer'),
      ...getInteractiveStyles(
        'indicatorsContainer',
        isDisabled,
        false,
        false,
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
    dropdownIndicator: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getElementStyles('dropdownIndicator'),
      ...getPadding('dropdownIndicator'),
      ...getInteractiveStyles(
        'dropdownIndicator',
        isDisabled,
        isFocused,
        false,
        hasValue
      ),
    }),
    clearIndicator: (css, { isFocused, hasValue }) => ({
      ...css,
      ...getPadding('clearIndicator'),
      ...getElementStyles('clearIndicator'),
      ...getInteractiveStyles(
        'clearIndicator',
        false,
        isFocused,
        false,
        hasValue
      ),
    }),
    loadingIndicator: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getPadding('loadingIndicator'),
      ...getElementStyles('loadingIndicator'),
      ...getInteractiveStyles(
        'loadingIndicator',
        isDisabled,
        isFocused,
        false,
        hasValue
      ),
    }),
    loadingMessage: (css, { hasValue }) => ({
      ...css,
      ...getElementStyles('loadingMessage'),
      ...getInteractiveStyles('loadingMessage', false, false, false, hasValue),
    }),

    menu: (css, { hasValue }) => ({
      ...css,
      ...getElementStyles('dropdown'),
      ...getInteractiveStyles('dropdown', false, false, false, hasValue),
    }),
    menuList: (css, { hasValue }) => ({
      ...css,
      ...getPadding('dropdownList'),
      ...getBorderRadius('dropdownList'),
      ...getElementStyles('dropdownList'),
      ...getInteractiveStyles('dropdownList', false, false, false, hasValue),
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
    noOptionsMessage: (css, { hasValue }) => ({
      ...css,
      ...getElementStyles('noOptionsMessage'),
      ...getInteractiveStyles('noOptionsMessage', {
        isDisabled: false,
        isFocused: false,
        isSelected: false,
        hasValue,
      }),
    }),

    valueContainer: (
      css,
      { isDisabled, hasValue, selectProps: { isSearchable } }
    ) => ({
      ...css,
      ...getElementStyles('valueContainer'),
      ...getPadding('valueContainer'),
      ...getDisplay('valueContainer'),
      ...getWidth('valueContainer'),
      ...getInteractiveStyles(
        'valueContainer',
        isDisabled,
        false,
        false,
        hasValue,
        isSearchable
      ),
    }),
    singleValue: (css, { isDisabled, hasValue }) => ({
      ...css,
      ...getElementStyles('singleValue'),
      ...getDisplay('singleValue'),
      ...getInteractiveStyles(
        'singleValue',
        isDisabled,
        false,
        false,
        hasValue
      ),
    }),
    multiValue: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getElementStyles('multiValue'),
      ...getDisplay('multiValue'),
      ...getPadding('multiValue'),
      ...getMargin('multiValue'),
      ...getInteractiveStyles(
        'multiValue',
        isDisabled,
        isFocused,
        false,
        hasValue
      ),
    }),
    multiValueLabel: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getElementStyles('multiValueLabel'),
      ...getPadding('multiValueLabel'),
      ...getMargin('multiValueLabel'),
      ...getInteractiveStyles(
        'multiValueLabel',
        isDisabled,
        isFocused,
        false,
        hasValue
      ),
    }),
    multiValueRemove: (css, { isDisabled, isFocused, hasValue }) => ({
      ...css,
      ...getElementStyles('multiValueRemove'),
      ...getPadding('multiValueRemove'),
      ...getMargin('multiValueRemove'),
      ...getInteractiveStyles(
        'multiValueRemove',
        isDisabled,
        isFocused,
        false,
        hasValue
      ),
    }),
  };

  return styles;
};
