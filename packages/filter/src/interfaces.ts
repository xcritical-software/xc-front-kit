import { IThemeNamespace, ITheme } from '@xcritical/theme';
import { OptionTypeBase } from 'react-select';
import { CSSProperties } from 'styled-components';

import {
  FILTERS_ADD_NEW,
  FILTERS_ADD,
  FILTERS_APPLY,
  FILTERS_UPDATE_SELECTED_FILTERS,
  FILTERS_CHANGE_FILTER,
  FILTERS_INIT,
  FILTERS_OPEN,
  FILTERS_REMOVE_FILTER,
  FILTERS_RESET,
} from './actions/const';


// Actions

export type FilterActionType =
 typeof FILTERS_ADD_NEW |
 typeof FILTERS_ADD |
 typeof FILTERS_UPDATE_SELECTED_FILTERS |
 typeof FILTERS_CHANGE_FILTER |
 typeof FILTERS_INIT |
 typeof FILTERS_OPEN |
 typeof FILTERS_REMOVE_FILTER |
 typeof FILTERS_APPLY |
 typeof FILTERS_RESET;

export interface IFilterAction<TPayload = any, T = FilterActionType> {
  type: T;
  meta: {
    filterName: string;
  };
  payload: TPayload;
}

export interface IState {
  drafts: IStateFilter[];
  applied: IStateFilter[];
}

export interface IPayloadRemoveFilter {
  guid: string;
}
export interface IPayloadChangeFilter {
  guid: string;
  field: string;
  value: string;
}

export interface IPayloadInitFilters {
  filters: IStateRecivedFilter[];
}

// Props

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


export interface IFilterTagProps extends IFilterRowProps {
  theme: IFilterTheme;
}

export interface IFilterRowProps {
  guid: string;
  filters: IFilter[];
  filter: IStateFilter;
  name: string;
  key: string;
}

export interface ISelectedFilterComponent {
  filters?: IFilter[];
  currentFilter?: IFilter;
  filterData?: IStateFilter;
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


export interface IFilterRecivedProps {
  filters: IFilter[];
  name: string;
  theme?: IThemeNamespace;
}

export interface IFilterTag extends IFilterRow {
  theme: IFilterTheme;
  onApply: () => void;
  onReset: () => void;
}

export interface ICompactFilterTag {
  theme: IFilterTheme;
  filters: IFilter[];
  name: string;
  key: string;
  filterId: string;
  conditions: IStateFilter[];
  onApply: () => void;
  onReset: () => void;
  onRemoveFilter?: any;
  onChangeFilter: Function;
}

export interface ITagConditionProps {
  currentFilterState: IStateFilter;
  conditions: IConditions;
  filterSetting?: IFilter;
  onChangeFilter: Function;
  onRemoveFilter: any;
}

export interface IFilterRow extends IFilterRowProps {
  removeFilter?: any;
  guid: string;
  onChangeFilter: Function;
  onRemoveFilter: any;
}

export interface IFilterProps extends IMapDispatchFilter {
  filters: IFilter[];
  activeFilters: IStateFilter[];
  addFilter: any;
  onApply: any;
  openFilters: any;
  name: string;
  resetFilters: any;
  theme?: IThemeNamespace;
}

export interface IMoreButtonWithFilterSelectorProps {
  selectedFilters: IStateFilter[];
  filters: IFilter[];
  onChange: (value: IStateRecivedFilter[]) => void;
}

export interface IAction {
  name: string;
  type: string;
}

export interface IFilterStateProps {
  filters: IFilter[];
  name: string;
  activeFilters: IStateFilter[];
}


export interface IMapDispatchFilterRow {
  onChangeFilter: Function;
  onRemoveFilter: Function;
}

export interface IMapDispatchFilter {
  addFilter: any;
  apply: any;
  openFilters: any;
  resetFilters: any;
  onChangeFilters: (values: IStateRecivedFilter[]) => void;
}

export interface IWrapperFilters {
  open: boolean;
  top: number;
  theme: IFilterTheme;
}


export interface IFilterTheme extends ITheme {
  tag: CSSProperties;
  topPanel: CSSProperties;
  filtersPanel: CSSProperties;
  filterPanelButtons: CSSProperties;
}

export type IThemeProp<T> = T;
