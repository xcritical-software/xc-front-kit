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
  FILTERS_SEARCH_UPDATE,
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
 typeof FILTERS_SEARCH_UPDATE |
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
  search: string;
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

export interface IPayloadApplyFilters {
  filters: IStateRecivedFilter[];
  search: string;
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
  isSearchable?: boolean;
}

export interface IFilterTag extends IFilterRow {
  theme: IFilterTheme;
  onApply: () => void;
  onReset: () => void;
}

export interface ITagContainerProps {
  theme: IFilterTheme;
  filters: IFilter[];
  name: string;
  key: string;
  filterId: string;
  conditions: IStateFilter[];
  onApply: () => void;
  onReset: () => void;
}

export interface ITagProps extends ITagContainerProps, IMapDispatchFilterTag {
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

export interface IFilterProps extends IMapDispatchFilter, IFilterRecivedProps {
  activeFilters: IStateFilter[];
  searchInput: string;
  isSearchable: boolean;
  addFilter: any;
  onApply: any;
  openFilters: any;
  resetFilters: any;
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
  searchInput: string;
}


export interface IMapDispatchFilterRow {
  onChangeFilter: Function;
  onRemoveFilter: Function;
}

export interface IMapDispatchFilterTag {
  onChangeFilter: Function;
  onRemoveFilter: Function;
  onAddCondition: Function;
}

export interface IMapDispatchFilter {
  addFilter: any;
  apply: any;
  openFilters: any;
  resetFilters: any;
  onChangeFilters: (values: IStateRecivedFilter[]) => void;
  onSearchInputChange: (value: string) => void;
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
