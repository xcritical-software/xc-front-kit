import { IThemeNamespace, ITheme } from '@xcritical/theme';
import { CSSProperties } from 'styled-components';

import {
  FILTERS_ADD,
  FILTERS_APPLY,
  FILTERS_UPDATE_SELECTED_FILTERS,
  FILTERS_CHANGE_FILTER,
  FILTERS_INIT,
  FILTERS_REMOVE_FILTER,
  FILTERS_RESET,
  FILTERS_SEARCH_UPDATE,
} from './actions/const';


// Actions

export type FilterActionType =
 typeof FILTERS_ADD |
 typeof FILTERS_UPDATE_SELECTED_FILTERS |
 typeof FILTERS_CHANGE_FILTER |
 typeof FILTERS_INIT |
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

export interface IFilterStore {
  drafts: IStateFilter[];
  applied: IStateFilter[];
  search: string;
}

// Action payloads

export interface IPayloadRemoveFilter {
  guid?: string;
  name?: string;
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
  Element?: (
    value: any,
    onChange: (value: any) => void,
    condition?: string
  ) => React.ReactElement;
}

export interface ICondition {
  name: string;
  hasValue: boolean;
}

export interface IConditions {
  [key: string]: ICondition;
}


export interface ISelectedFilterComponent {
  filters?: IFilter[];
  currentFilter?: IFilter;
  filterData?: IStateFilter;
  onChange: (value: any) => void;
}

export interface IStateRecivedFilter {
  column: string;
  condition: string;
  value: string;
}

export interface IStateFilter extends IStateRecivedFilter {
  key: string;
}


export interface ITagContainerProps {
  theme: IFilterTheme;
  filters: IFilter[];
  name: string;
  key: string;
  filterId: string;
  conditions: IStateFilter[];
  onApply: () => void;
}


export interface IMapDispatchFilterTag {
  onChangeFilter: (changes: IPayloadChangeFilter) => void;
  onRemoveFilter: (filter: IPayloadRemoveFilter) => void;
  onAddCondition: (filterId: string) => void;
}


export interface ITagProps extends ITagContainerProps, IMapDispatchFilterTag {
}

export interface ITagConditionProps {
  currentFilterState: IStateFilter;
  conditions: IConditions;
  filterSetting?: IFilter;
  onChangeFilter: (changes: IPayloadChangeFilter) => void;
  onRemoveFilter: (filter: IPayloadRemoveFilter) => void;
}

export interface IFilterContainerProps {
  activeFilters: IStateFilter[];
  searchInput: string;
}

export interface IFilterProps {
  filters: IFilter[];
  name: string;
  theme?: IThemeNamespace;
  isSearchable?: boolean;
}

export interface IApplyAction {
  (filters?: IStateRecivedFilter[], search?: string): void;
}

export interface IMapDispatchFilter {
  onApply: IApplyAction;
  onResetFilters: () => void;
  onChangeFilters: (values: IStateRecivedFilter[]) => void;
  onSearchInputChange: (value: string) => void;
}


export interface IFilterComponentProps extends IMapDispatchFilter,
  IFilterContainerProps,
  IFilterProps {
  onApply: () => void;
}

export interface IMoreButtonWithFilterSelectorProps {
  selectedFilters: IStateFilter[];
  filters: IFilter[];
  onChange: (value: IStateRecivedFilter[]) => void;
}

// Theme interfaces

export interface IFilterTheme extends ITheme {
  tag: CSSProperties;
  topPanel: CSSProperties;
  filtersPanel: CSSProperties;
  filterPanelButtons: CSSProperties;
}

export type IThemeProp<T> = T;
