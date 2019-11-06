import React, {
  useEffect,
  ReactElement,
  useState,
  useRef,
  MutableRefObject,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { ThemeContext } from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from '@xcritical/button';

import {
  Wrapper,
  TopPanel,
  WrapperFilters,
  FilterColumn,
  FiltersHeader,
  TopPanelTags,
  TopPanelButtons,
  WrapperFilterButtons,
} from './styled';
import FilterRow from './FilterRow';
import Tag from './Tag';
import {
  xcriticalFiltersAddFilter,
  xcriticalFiltersApply,
  xcriticalFiltersOpenFilters,
  xcriticalFiltersReset,
} from './actions';
import {
  IFilterRecivedProps,
  IFilterProps,
  IStateFilter,
  IStateRecivedFilter,
  IFilter,
  IFilterStateProps,
  IMapDispatchFilter,
} from './interfaces';
import { filterThemeNamespace, defaultTheme } from './theme';
import { IFilterTheme, filterTheme } from './utils';


const Filter: React.SFC<IFilterProps> = ({
  filters,
  activeFilters = [],
  addFilter,
  apply,
  openFilters,
  name,
  resetFilters,
  theme = {
    [filterThemeNamespace]: defaultTheme,
  },
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(
    filterTheme<IFilterTheme>(theme || contextTheme),
  );
  const [open, changeOpen] = useState(true);
  const buttonsRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    openFilters();
  }, [openFilters]);

  const filtersItems = useMemo(
    () => filters.reduce(
      (acc, { field, displayName }) => ({
        ...acc,
        [field]: { name: displayName },
      }),
      {},
    ),
    [filters],
  );

  const handleOpen = useCallback(() => {
    changeOpen(!open);
  }, [open]);

  const handleApply = useCallback(() => {
    const mappedFilters = activeFilters
      .filter(
        ({ column }: IStateFilter) => column && column !== 'Please select...',
      )
      .map(({ column, condition, value }: IStateFilter) => ({
        column,
        condition,
        value,
      }));
    apply(mappedFilters);
  }, [activeFilters, apply]);

  const handleAddFilter = useCallback(() => addFilter(), [addFilter]);
  const handleResetFilters = useCallback(() => resetFilters(), [resetFilters]);

  return (
    <Wrapper>
      <TopPanel theme={ themeRef.current }>
        <TopPanelTags>
          { activeFilters.map((filter) => (
            <Tag
              guid={ filter.key }
              filters={ filters }
              filter={ filter }
              name={ name }
              key={ filter.column + filter.condition + filter.value + filter.key }
              theme={ themeRef.current }
              filterItems={ filtersItems }
            />
          )) }
        </TopPanelTags>

        <TopPanelButtons ref={ buttonsRef }>
          <Button
            appearance="filters-more-button-appearance"
            onClick={ handleOpen }
          >
            More filters
          </Button>
          <Button
            appearance="filters-apply-button-appearance"
            onClick={ handleApply }
          >
            Apply
          </Button>
        </TopPanelButtons>
      </TopPanel>

      <WrapperFilters
        open={ open }
        top={ buttonsRef.current && buttonsRef.current.offsetTop }
      >
        <FiltersHeader>
          <FilterColumn>Filter name</FilterColumn>
          <FilterColumn>Condition</FilterColumn>
          <FilterColumn>Value</FilterColumn>
        </FiltersHeader>
        { activeFilters.map((filter: IStateFilter) => (
          <FilterRow
            filterItems={ filtersItems }
            guid={ filter.key }
            filters={ filters }
            filter={ filter }
            name={ name }
            key={ filter.key }
          />
        )) }
        <WrapperFilterButtons>
          <Button
            appearance="filter-add-button-appearance"
            disabled={ activeFilters.some(({ column, condition, value }: IStateFilter) => {
              if (value) return false;
              if (!condition) return true;
              const filter = filters.find((f: IFilter) => f.field === column);
              if (filter && filter.conditions[condition].hasValue) {
                return !value;
              }
              return false;
            }) }
            onClick={ handleAddFilter }
          >
            Add new filter
          </Button>
          <Button
            appearance="filter-reset-button-appearance"
            disabled={ !activeFilters.some(({ column }: IStateFilter) => column) }
            onClick={ handleResetFilters }
          >
            Reset filters
          </Button>
        </WrapperFilterButtons>
      </WrapperFilters>
    </Wrapper>
  );
};

const mapStateToProps = (
  state: any,
  ownProps: IFilterRecivedProps,
): IFilterStateProps => ({
  activeFilters: state.filters[ownProps.name],
  ...ownProps,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: any,
): IMapDispatchFilter => ({
  addFilter: () => dispatch(xcriticalFiltersAddFilter(name)),
  apply: (filters: IStateRecivedFilter[]) => dispatch(xcriticalFiltersApply(name, filters)),
  openFilters: () => dispatch(xcriticalFiltersOpenFilters(name)),
  resetFilters: () => dispatch(xcriticalFiltersReset(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
