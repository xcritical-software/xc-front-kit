import { GroupBase, Props } from 'react-select';
import { FormatOptionLabelContext } from 'react-select/dist/declarations/src/Select';

import { IThemeNamespace, ICSSProperties, IThemeBase } from '@xcritical/theme';

export interface IIsRTL {
  isRTL?: boolean;
}

export type OptionTypeBase = {
  readonly value: string;
  readonly label: string;
};

export interface IThemeProps {
  theme: IThemeNamespace<ISelectBaseTheme>;
  appearance: string;
  baseAppearance: string;
}

export interface ISelectOnlyProps {
  appearance?: string;
  baseAppearance?: string;
  disabled?: boolean;
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

export type SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<Props<Option, IsMulti, Group>, 'theme'> & ISelectOnlyProps;

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

export interface IOptionProps extends IThemeProps {
  classNamePrefix?: string;
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  context: FormatOptionLabelContext;
  isRTL: boolean;
}

export interface IOptionItem {
  prefix?: React.ReactElement;
  postfix?: React.ReactElement;
  name: any;
  label: string;
}

export interface IPrefixProps extends IThemeProps, IIsRTL {}
