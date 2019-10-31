import React, {
  useEffect, ReactElement, useState, useRef, MutableRefObject, useContext,
} from 'react';
import { ThemeContext } from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
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
import Button from '../../button/src';
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
  // theme = {
  //   [filterThemeNamespace]: defaultTheme,
  // },
}): ReactElement => {
  const themeRef = useRef(filterTheme<IFilterTheme>(
    useContext(ThemeContext) || { [filterThemeNamespace]: defaultTheme },
  ));
  const [open, changeOpen] = useState(false);
  const buttonsRef: MutableRefObject<any> = useRef();
  // console.log(themeRef.current)
  useEffect(() => {
    openFilters();
  }, [openFilters]);

  return (
    <Wrapper>
      <TopPanel theme={ themeRef.current }>

        <TopPanelTags>
          { activeFilters.map((filter, id) => (
            <Tag
              id={ id }
              filters={ filters }
              filter={ filter }
              name={ name }
              key={ filter.column + filter.condition + filter.value + filter.key }
              theme={ themeRef.current }
            />
          )) }
        </TopPanelTags>

        <TopPanelButtons ref={ buttonsRef }>
          <Button
            appearance={ themeRef.current.buttonsAppearances.more }
            onClick={ () => changeOpen(!open) }
          >
              More filters
          </Button>
          <Button
            appearance={ themeRef.current.buttonsAppearances.apply }
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
          </Button>
        </TopPanelButtons>

      </TopPanel>


      <WrapperFilters open={ open } top={ buttonsRef.current && buttonsRef.current.offsetTop }>
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
        <WrapperFilterButtons>
          <Button
            appearance={ themeRef.current.buttonsAppearances.add }
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
            appearance={ themeRef.current.buttonsAppearances.reset }
            disabled={ !activeFilters.find(({ column }: IStateFilter) => column) }
            onClick={ () => resetFilters() }
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
