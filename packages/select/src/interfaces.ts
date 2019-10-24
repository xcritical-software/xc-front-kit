import { OptionTypeBase } from 'react-select/src/types';
import SelectBase from 'react-select/src/Select';
import { ITheme, IThemeNamespace, IIndents } from '@xcritical/theme';
import { IndicatorProps } from 'react-select/src/components/indicators';


export type DropdownIndicatorProps = IndicatorProps<OptionTypeBase> & {
  getStyles: any;
};

export interface IThemeProps {
  theme?: IThemeNamespace<SelectTheme>;
  appearance?: string;
  baseAppearance?: string;
}

export interface ISelectOnlyProps {
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

export type SelectProps = SelectBase<OptionTypeBase> & ISelectOnlyProps & IThemeProps;

export interface ISelectTheme {
  padding?: IIndents;
  margin?: IIndents;
  outline?: ISelectTheme;
  selected?: ISelectTheme;
  active?: ISelectTheme;
  hover?: ISelectTheme;
  disabled?: ISelectTheme;
}

export interface IReturnFunction<TProp, TValue> {
  (props: TProp): TValue;
}

export type GetStyles<TResult = { [key: string]: any }> = IReturnFunction<
SelectProps,
IReturnFunction<
{ [key: string]: any },
TResult
>
>;

export type SelectTheme = ITheme<ISelectTheme>;
