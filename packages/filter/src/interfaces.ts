import { IThemeNamespace } from '@xcritical/theme';
import { IFilterTheme } from './utils';


export interface IFilterTag extends IFilterRow {
  theme: IFilterTheme;
}
export interface IFilterRow {
  filters: IFilter[];
  filter: IFilterFromStore;
  removeFilter: Function;
  id: number;
  changeFilter: Function;
}

export interface IFilter {
  field: string;
  displayName: string;
  conditions: IConditions;
  Element: Function;
}

export interface ICondition {
  displayName: string;
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
  id: number;
  filters: IFilter[];
  filter: IFilterFromStore;
  name: string;
  key: string;
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
  [key: string]: IStateFilter[];
}

export interface IFilterRecivedProps {
  filters: IFilter[];
  name: string;
  theme?: IThemeNamespace;
}

export interface IFilterProps {
  filters: IFilter[];
  activeFilters: IStateFilter[];
  addFilter: Function;
  apply: Function;
  openFilters: Function;
  name: string;
  resetFilters: Function;
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
  id: number;
}

export interface IChangeFilter extends IAction {
  payload: IPayloadChangeFilter;
}
export interface IPayloadChangeFilter {
  id: number;
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
  addFilter: Function;
  apply: Function;
  openFilters: Function;
  resetFilters: Function;
}
