import React, { MutableRefObject } from 'react';
import { CSSProperties } from 'styled-components';

import { IThemeNamespace, ITheme } from '@xcritical/theme';
import { IPopoverTheme } from '@xcritical/popover';

import {
  FILTERS_ADD,
  FILTERS_APPLY,
  FILTERS_UPDATE_SELECTED_FILTERS,
  FILTERS_CHANGE_FILTER,
  FILTERS_INIT,
  FILTERS_REMOVE_FILTER,
  FILTERS_RESET,
  FILTERS_SEARCH_UPDATE,
} from './actions';

// Actions

export type FilterActionType =
  | typeof FILTERS_ADD
  | typeof FILTERS_UPDATE_SELECTED_FILTERS
  | typeof FILTERS_CHANGE_FILTER
  | typeof FILTERS_INIT
  | typeof FILTERS_REMOVE_FILTER
  | typeof FILTERS_APPLY
  | typeof FILTERS_SEARCH_UPDATE
  | typeof FILTERS_RESET;

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

export interface IPayloadBaseChangeFilter {
  guid: string;
  value: string;
}

export interface IPayloadChangeFilterColumn extends IPayloadBaseChangeFilter {
  field: 'column';
}

export interface IPayloadChangeFilterValue extends IPayloadBaseChangeFilter {
  field: 'value';
}

export interface IPayloadChangeFilterCondition
  extends IPayloadBaseChangeFilter {
  field: 'condition';
  hasFieldForValue?: boolean;
  valueType?: string;
}

export type PayloadChangeFilterType =
  | IPayloadChangeFilterValue
  | IPayloadChangeFilterCondition
  | IPayloadChangeFilterColumn;

export interface IPayloadInitFilters {
  filters: IStateRecivedFilter[];
  search: string;
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
  isHidden?: boolean;
  validate?: (conditions: IStateFilter[]) => Record<string, string>;
  type?: string;
  Element?: (
    value: any,
    onChange: (value: any) => void,
    condition?: string,
    validationError?: string,
    tagConditionsRef?: ISelectedFilterComponent['tagConditionsRef']
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
  validationError?: string;
  onChange: (value: any) => void;
  tagConditionsRef: MutableRefObject<null | HTMLDivElement>;
  className?: string;
  classNamePrefix?: string;
}

export interface IStateRecivedFilter {
  column: string;
  condition: string;
  value: any;
  key?: string;
}

export interface IStateFilter extends IStateRecivedFilter {
  key: string;
}

export interface ITagContainerProps {
  filters: IFilter[];
  name: string;
  key: string;
  filterId: string;
  conditions: IStateFilter[];
  onApply: () => void;
}

export interface IMapDispatchFilterTag {
  onChangeFilter: (changes: PayloadChangeFilterType) => void;
  onRemoveFilter: (filter: IPayloadRemoveFilter) => void;
  onAddCondition: (filterId: string) => void;
}

export interface ITagProps extends ITagContainerProps, IMapDispatchFilterTag {
  filterTheme: IFilterTheme;
  disabled: boolean;
  isAutoSelectFirstCondition: boolean;
  isAutoOpenAddedTag: boolean;
  className?: string;
  classNamePrefix?: string;
}

export interface ITagConditionProps {
  tagConditionsRef: MutableRefObject<null | HTMLDivElement>;
  currentFilterState: IStateFilter;
  filterSetting?: IFilter;
  validationError?: string;
  filterTheme: IFilterTheme;
  onChangeFilter: (changes: PayloadChangeFilterType) => void;
  onRemoveFilter: (filter: IPayloadRemoveFilter) => void;
  className?: string;
  classNamePrefix?: string;
}

export interface IFilterContainerProps {
  activeFilters: IStateFilter[];
  searchInput: string;
}

export interface IFilterProps {
  className?: string;
  classNamePrefix?: string;
  filters: IFilter[];
  name: string;
  theme?: IThemeNamespace;
  isSearchable?: boolean;
  disabled?: boolean;
  isAutoSelectFirstCondition?: boolean;
  isAutoOpenAddedTag?: boolean;
  isTagsVisible?: boolean;
  moreName?: string;
  resetName?: string;
  searchName?: string;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
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

export interface IFilterComponentProps
  extends IMapDispatchFilter,
    IFilterContainerProps,
    IFilterProps {
  onApply: () => void;
}

export interface IMoreButtonWithFilterSelectorProps {
  selectedFilters: IStateFilter[];
  filters: IFilter[];
  disabled: boolean;
  isAutoOpenAddedTag: boolean;
  filterTheme: IFilterTheme;
  onChange: (value: IStateRecivedFilter[]) => void;
  className?: string;
  classNamePrefix?: string;
}

export interface IDropdownProps {
  target: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  filterTheme: IFilterTheme;
  onClose: () => void;
  className?: string;
  classNamePrefix?: string;
}

export interface IBlanketProps {
  zIndex?: number;
}

// Theme interfaces

export interface IFilterTheme extends ITheme {
  rootPanel?: CSSProperties;
  topPanel?: CSSProperties;
  prefix?: CSSProperties;
  searchInputWrapper?: CSSProperties;
  topPanelTags?: CSSProperties;
  topPanelButtons?: CSSProperties;
  postfix?: CSSProperties;
  validationError?: CSSProperties;
  tagConditions?: CSSProperties;
  tagConditionSelectZIndex?: number;
  dropdownBlanketZIndex?: number;
  popover?: IPopoverTheme;
}

export type IThemeProp<T> = T;

export interface IIcon {
  classNamePrefix?: string;
  size?: number;
}
