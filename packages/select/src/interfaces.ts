import { OptionTypeBase } from 'react-select/src/types';
import SelectBase, { FormatOptionLabelContext } from 'react-select/src/Select';
import { ITheme, IThemeNamespace, IStylesBase } from '@xcritical/theme';
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
  theme?: IThemeNamespace<SelectTheme>;
  appearance?: string;
  baseAppearance?: string;
  disabled?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  isOpenMenu?: boolean;
  items?: any[];
  onChange?: Function;
  value?: string | { [key: string]: any };
  className?: string;
  shouldFitContainer?: boolean;
  isRTL?: boolean;
  isCloseMenuOnSelect?: boolean;
  isHideSelectedOptions?: boolean;
  isControlShouldRenderValue?: boolean;
  textPosition?: string;
  placeholder?: string;
}

export type SelectProps = SelectBase<OptionTypeBase> & ISelectOnlyProps;

export interface ISubComponents {
  dropdown?: ISelectTheme;
  dropdownList?: ISelectTheme;
  button?: ISelectTheme;
  indicatorsContainer?: ISelectTheme;
  indicatorSeparator?: ISelectTheme;
  dropdownIndicator?: ISelectTheme;
  clearIndicator?: ISelectTheme;
  loadingIndicator?: ISelectTheme;
  loadingMessage?: ISelectTheme;
  input?: ISelectTheme;
  placeholder?: ISelectTheme;
  labelText?: ISelectTheme;
  option?: ISelectTheme;
  valueContainer?: ISelectTheme;
  singleValue?: ISelectTheme;
  multiValue?: ISelectTheme;
  multiValueLabel?: ISelectTheme;
  multiValueRemove?: ISelectTheme;
  noOptionsMessage?: ISelectTheme;
}

export interface ISelectTheme extends IStylesBase {
  divided?: {
    color: string;
  };

  outline?: ISelectTheme;

}

export interface IReturnFunction< TValue> {
  (theme: IThemeNamespace<SelectTheme>, appearance: string, baseAppearance: string): TValue;
}

export interface IReturnWithArgsFunction<TProp, TValue> {
  (elementName: string, ...props: TProp[]): TValue;
}

export type GetStyles<TResult = { [key: string]: any }> =
  IReturnFunction<IReturnWithArgsFunction<any, TResult>>;

export type SelectTheme = ITheme<ISelectTheme & ISubComponents>;

export interface IOptionProps extends IThemeProps, OptionTypeBase {
  icon: React.ReactElement;
  context: FormatOptionLabelContext;
  isRTL: boolean;
}
