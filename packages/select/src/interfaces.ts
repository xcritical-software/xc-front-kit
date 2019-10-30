import { OptionTypeBase } from 'react-select/src/types';
import { FormatOptionLabelContext, Props } from 'react-select/src/Select';
import {
  ITheme, IThemeNamespace, IStylesBase, IThemeBase,
} from '@xcritical/theme';
import { IndicatorProps } from 'react-select/src/components/indicators';


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
  theme: IThemeNamespace<ITheme<ISelectBaseTheme>>;
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
  items?: { [key: string]: IOptionItem };
  value?: string | { [key: string]: IOptionItem };
  className?: string;
  shouldFitContainer?: boolean;
  isRTL?: boolean;
  isCloseMenuOnSelect?: boolean;
  isHideSelectedOptions?: boolean;
  isControlShouldRenderValue?: boolean;
  textPosition?: string;
  placeholder?: string;
  theme?: IThemeNamespace<ITheme<ISelectBaseTheme>>;
}

export type SelectProps = Omit<Props<IOptionProps>, 'theme' | 'value'> & ISelectOnlyProps;

export interface ISubComponents {
  dropdown?: IThemeBase<ISelectCssTheme>;
  dropdownList?: IThemeBase<ISelectCssTheme>;
  button?: IThemeBase<ISelectCssTheme>;
  indicatorsContainer?: IThemeBase<ISelectCssTheme>;
  indicatorSeparator?: IThemeBase<ISelectCssTheme>;
  dropdownIndicator?: IThemeBase<ISelectCssTheme>;
  clearIndicator?: IThemeBase<ISelectCssTheme>;
  loadingIndicator?: IThemeBase<ISelectCssTheme>;
  loadingMessage?: IThemeBase<ISelectCssTheme>;
  input?: IThemeBase<ISelectCssTheme>;
  placeholder?: IThemeBase<ISelectCssTheme>;
  labelText?: IThemeBase<ISelectCssTheme>;
  option?: IThemeBase<ISelectCssTheme>;
  valueContainer?: IThemeBase<ISelectCssTheme>;
  singleValue?: IThemeBase<ISelectCssTheme>;
  multiValue?: IThemeBase<ISelectCssTheme>;
  multiValueLabel?: IThemeBase<ISelectCssTheme>;
  multiValueRemove?: IThemeBase<ISelectCssTheme>;
  noOptionsMessage?: IThemeBase<ISelectCssTheme>;
}

export interface ISelectCssTheme extends IStylesBase {
  divided?: {
    color: string;
  };
  boxShadow?: string;
  prefixSpacing?: number;
  postfixSpacing?: number;
}

export interface ILabelTextCssTheme extends ISelectCssTheme {
  prefixSpacing?: number;
  postfixSpacing?: number;
}

export interface ISelectBaseTheme extends ISelectCssTheme, ISubComponents {
}

export interface IReturnFunction< TValue> {
  (
    theme: IThemeNamespace<ITheme<ISelectBaseTheme>>,
    appearance: string,
    baseAppearance: string
  ): TValue;
}

export interface IReturnWithArgsFunction<TProp, TValue> {
  (elementName: string, ...props: TProp[]): TValue;
}

export type GetStyles<TResult = { [key: string]: any }> =
  IReturnFunction<IReturnWithArgsFunction<any, TResult>>;


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

export interface IPrefixProps extends IThemeProps, IIsRTL {
}
