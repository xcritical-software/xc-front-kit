import { IThemeNamespace } from '@xcritical/theme';
import { OptionTypeBase } from 'react-select';
import { IFilterTheme } from './utils';


export interface IFilter {
  field: string;
  displayName: string;
  conditions: IConditions;
  Element: Function;
}

export interface ICondition {
  name: string;
  hasValue: boolean;
}

export interface IConditions {
  [key: string]: ICondition;
}

interface IFilterFromStore {
  column: string;
  condition: string;
  value: string;
  key: string;
}

export interface IFilterTagProps extends IFilterRowProps {
  theme: IFilterTheme;
}

export interface IFilterRowProps {
  guid: string;
  filters: IFilter[];
  filter: IFilterFromStore;
  name: string;
  key: string;
  filterItems: any;
}

export interface ISelectedFilterComponent {
  filters?: IFilter[];
  currentFilter?: IFilter;
  filterData?: IFilterFromStore;
  onChange: ({ value }: OptionTypeBase) => void;
}

export interface IStateRecivedFilter {
  column: string;
  condition: string;
  value: string;
}

export interface IStateFilter extends IStateRecivedFilter {
  key: string;
}

export interface IState {
  // [key: string]: IStateFilter[];
  [key: string]: any;

}

export interface IFilterRecivedProps {
  filters: IFilter[];
  name: string;
  theme?: IThemeNamespace;
}

export interface IFilterTag extends IFilterRow {
  theme: IFilterTheme;
}
export interface IFilterRow extends IFilterRowProps {
  removeFilter: any;
  guid: string;
  changeFilter: Function;
  filterItems: OptionTypeBase[];
}

export interface IFilterProps {
  filters: IFilter[];
  activeFilters: IStateFilter[];
  addFilter: any;
  apply: any;
  openFilters: any;
  name: string;
  resetFilters: any;
  theme?: IThemeNamespace;
}

export interface IAction {
  name: string;
  type: string;
}

export interface IRemoveFilter extends IAction {
  payload: IPayloadRemoveFilter;
}
export interface IPayloadRemoveFilter {
  guid: string;
}

export interface IChangeFilter extends IAction {
  payload: IPayloadChangeFilter;
}
export interface IPayloadChangeFilter {
  guid: string;
  field: string;
  value: string;
}

export interface IInitFilters extends IAction {
  payload: IPayloadInitFilters;
}
export interface IPayloadInitFilters {
  filters: IStateRecivedFilter[];
}

export type FilterActionTypes =
  | IAction
  | IRemoveFilter
  | IChangeFilter
  | IInitFilters;

export interface IFilterStateProps {
  filters: IFilter[];
  name: string;
  activeFilters: IStateFilter[];
}


export interface IMapDispatchFilterRow {
  changeFilter: Function;
  removeFilter: Function;
}

export interface IMapDispatchFilter {
  addFilter: any;
  apply: any;
  openFilters: any;
  resetFilters: any;
}

export interface IWrapperFilters {
  open: boolean;
  top: number;
  theme: IFilterTheme;
}
