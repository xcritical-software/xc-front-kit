import { OptionTypeBase } from 'react-select/src/types';
import { FormatOptionLabelContext, Props } from 'react-select/src/Select';
import { IndicatorProps } from 'react-select/src/components/indicators';

import { IThemeNamespace, ICSSProperties, IThemeBase } from '@xcritical/theme';

export type DropdownIndicatorProps = IndicatorProps<IOptionItem> & {
  getStyles: any;
};

export type ClearIndicatorProps = IndicatorProps<IOptionItem> & {
  getStyles: any;
};

export type MultiValueRemoveProps = IndicatorProps<IOptionItem> & {
  getStyles: any;
};

export interface IIsRTL {
  isRTL?: boolean;
}

export interface IThemeProps {
  theme: IThemeNamespace<ISelectBaseTheme>;
  appearance: string;
  baseAppearance: string;
}

export interface ISelectOnlyProps {
  appearance?: string;
  baseAppearance?: string;
  disabled?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  isOpenMenu?: boolean;
  className?: string;
  shouldFitContainer?: boolean;
  isRTL?: boolean;
  isCloseMenuOnSelect?: boolean;
  isHideSelectedOptions?: boolean;
  isControlShouldRenderValue?: boolean;
  textPosition?: string;
  placeholder?: string;
  theme?: IThemeNamespace<ISelectBaseTheme>;
}

export type SelectProps = Omit<Props<IOptionProps>, 'theme' | 'value'> &
  ISelectOnlyProps;

export interface ISubComponents {
  button?: IThemeBase<ISelectCssTheme>;
  clearIndicator?: IThemeBase<ISelectCssTheme>;
  dropdown?: IThemeBase<ISelectCssTheme>;
  dropdownList?: IThemeBase<ISelectCssTheme>;
  dropdownIndicator?: IThemeBase<ISelectCssTheme>;
  group?: IThemeBase<ISelectCssTheme>;
  groupHeading?: IThemeBase<ISelectCssTheme>;
  indicatorsContainer?: IThemeBase<ISelectCssTheme>;
  indicatorSeparator?: IThemeBase<ISelectCssTheme>;
  input?: IThemeBase<ISelectCssTheme>;
  labelText?: IThemeBase<ISelectCssTheme>;
  loadingIndicator?: IThemeBase<ISelectCssTheme>;
  loadingMessage?: IThemeBase<ISelectCssTheme>;
  multiValue?: IThemeBase<ISelectCssTheme>;
  multiValueLabel?: IThemeBase<ISelectCssTheme>;
  multiValueRemove?: IThemeBase<ISelectCssTheme>;
  noOptionsMessage?: IThemeBase<ISelectCssTheme>;
  option?: IThemeBase<ISelectCssTheme>;
  placeholder?: IThemeBase<ISelectCssTheme>;
  singleValue?: IThemeBase<ISelectCssTheme>;
  valueContainer?: IThemeBase<ISelectCssTheme>;
}

export interface ISelectCssTheme extends ICSSProperties {
  divided?: ICSSProperties;
  boxShadow?: string;
  prefixSpacing?: number;
  postfixSpacing?: number;
  filled?: ICSSProperties;
}

export interface ILabelTextCssTheme extends ISelectCssTheme {
  prefixSpacing?: number;
  postfixSpacing?: number;
}

export interface ISelectBaseTheme extends ISelectCssTheme, ISubComponents {}

export interface IReturnFunction<TValue> {
  (
    theme: IThemeNamespace<ISelectBaseTheme>,
    appearance: string,
    baseAppearance: string
  ): TValue;
}

export interface IReturnWithArgsFunction<TProp, TValue> {
  (elementName: string, ...props: TProp[]): TValue;
}

export type GetStyles<TResult = { [key: string]: any }> = IReturnFunction<
  IReturnWithArgsFunction<any, TResult>
>;

export interface IOptionProps extends IThemeProps, OptionTypeBase {
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  context: FormatOptionLabelContext;
  isRTL: boolean;
}

export interface IOptionItem extends OptionTypeBase {
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  name: any;
}

export interface IPrefixProps extends IThemeProps, IIsRTL {}
