import React, { useEffect, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Wrapper,
  FilterButton,
  TopPanel,
  WrapperFilters,
  Header,
  HeaderTab,
  BodyWrapper,
  FilterColumn,
  FiltersHeader,
  Button,
  SubmitButton,
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


const Filter: React.SFC<IFilterProps> = ({
  filters,
  activeFilters = [],
  addFilter,
  apply,
  openFilters,
  name,
  resetFilters,
}): ReactElement => {
  const [open, changeOpen] = useState(false);

  useEffect(() => {
    openFilters();
  }, [openFilters]);

  return (
    <Wrapper>
      <TopPanel>
        <FilterButton onClick={ () => changeOpen(!open) }>
Filter
        </FilterButton>
        { activeFilters.map((filter, id) => (
          <Tag
            id={ id }
            filters={ filters }
            filter={ filter }
            name={ name }
            key={ filter.column + filter.condition + filter.value }
          />
        )) }
      </TopPanel>
      <WrapperFilters open={ open }>
        <Header>
          <HeaderTab>Filter</HeaderTab>
          <SubmitButton
            onClick={ () => apply(
              activeFilters
                .filter(
                  ({ column }: IStateFilter) => column && column !== 'Please select...',
                )
                .map(({ column, condition, value }: IStateFilter) => ({
                  column,
                  condition,
                  value,
                })),
            ) }
          >
            Apply
          </SubmitButton>
        </Header>

        <BodyWrapper>
          <FiltersHeader>
            <FilterColumn>Filter name</FilterColumn>
            <FilterColumn>Condition</FilterColumn>
            <FilterColumn>Value</FilterColumn>
          </FiltersHeader>
          { activeFilters.map((filter: IStateFilter, id: number) => (
            <FilterRow
              id={ id }
              filters={ filters }
              filter={ filter }
              name={ name }
              key={ filter.key }
            />
          )) }

          <Button
            disabled={
              !!activeFilters.find(
                ({ column, condition, value }: IStateFilter) => {
                  if (value) return false;
                  if (!condition) return true;
                  const filter = filters.find(
                    (f: IFilter) => f.field === column,
                  );
                  if (filter && filter.conditions[condition].hasValue) {
                    return !value;
                  }
                  return false;
                },
              )
            }
            onClick={ () => addFilter() }
          >
            Add new filter
          </Button>
          <Button
            disabled={ !activeFilters.find(({ column }: IStateFilter) => column) }
            onClick={ () => resetFilters() }
          >
            Reset filters
          </Button>
        </BodyWrapper>
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
  { name }: IFilterRecivedProps,
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
