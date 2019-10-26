import { OptionTypeBase } from 'react-select/src/types';
import { FormatOptionLabelContext, Props } from 'react-select/src/Select';
import {
  ITheme, IThemeNamespace, IStylesBase, IThemeBase,
} from '@xcritical/theme';
import { IndicatorProps } from 'react-select/src/components/indicators';


export type DropdownIndicatorProps = IndicatorProps<OptionTypeBase> & {
  getStyles: any;
};

export interface IThemeProps {
  theme: IThemeNamespace<SelectTheme>;
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
  items?: { [key: string]: any};
  value?: string | { [key: string]: any };
  className?: string;
  shouldFitContainer?: boolean;
  isRTL?: boolean;
  isCloseMenuOnSelect?: boolean;
  isHideSelectedOptions?: boolean;
  isControlShouldRenderValue?: boolean;
  textPosition?: string;
  placeholder?: string;
  theme?: IThemeNamespace<SelectTheme>;
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
}

export type ISelectTheme = ISelectCssTheme & ISubComponents;

export interface IReturnFunction< TValue> {
  (theme: IThemeNamespace<SelectTheme>, appearance: string, baseAppearance: string): TValue;
}

export interface IReturnWithArgsFunction<TProp, TValue> {
  (elementName: string, ...props: TProp[]): TValue;
}

export type GetStyles<TResult = { [key: string]: any }> =
  IReturnFunction<IReturnWithArgsFunction<any, TResult>>;

export type SelectTheme = ITheme<ISelectTheme>;

export interface IOptionProps extends IThemeProps, OptionTypeBase {
  icon: React.ReactElement;
  context: FormatOptionLabelContext;
  isRTL: boolean;
}
