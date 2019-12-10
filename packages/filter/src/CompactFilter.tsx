import React, {
  useEffect,
  ReactElement,
  useRef,
  MutableRefObject,
  useContext,
  useMemo,
} from 'react';
import { ThemeContext } from 'styled-components';
import Button from '@xcritical/button';
import Input from '@xcritical/input';

import {
  TopPanel,
  TopPanelButtons,
  RootPanel,
  TopPanelTags,
  MoreFilterSelect,
  SearchInputWrapper,
  Tag,
  Search,
} from './components';

import {
  IFilterProps,
  IFilterTheme,
} from './interfaces';
import { filterTheme } from './utils';


const groupBy = (xs: any[], key) => xs.reduce((rv, x) => {
  (rv[x[key]] = rv[x[key]] || []).push(x);
  return rv;
}, {});


const PureCompactFilter: React.FC<IFilterProps> = ({
  filters,
  activeFilters = [],
  onApply,
  searchInput,
  isSearchable = true,
  openFilters,
  name,
  resetFilters,
  onChangeFilters,
  onSearchInputChange,
  theme,
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(filterTheme<IFilterTheme>(theme || contextTheme));
  const buttonsRef: MutableRefObject<any> = useRef();


  useEffect(() => {
    openFilters();
  }, [openFilters]);

  const mergedFilters = useMemo(
    () => groupBy(
      activeFilters.filter((filter) => filter.column),
      'column',
    ),
    [activeFilters],
  );


  return (
    <RootPanel>
      <TopPanel theme={ themeRef.current }>
        {
          isSearchable
            ? (
              <SearchInputWrapper>
                <Input
                  prefix={ <Search /> }
                  value={ searchInput }
                  onChange={ onSearchInputChange }
                  appearance="filters-search"
                />
              </SearchInputWrapper>
            )
            : null
        }
        <TopPanelTags>
          { Object.keys(mergedFilters)
            .map((filterId) => (
              <Tag
                name={ name }
                key={ filterId }
                filters={ filters }
                filterId={ filterId }
                conditions={ mergedFilters[filterId] }
                theme={ themeRef.current }
                onApply={ onApply }
                onReset={ resetFilters }
              />
            )) }
        </TopPanelTags>

        <TopPanelButtons ref={ buttonsRef }>
          <MoreFilterSelect
            onChange={ onChangeFilters }
            filters={ filters }
            selectedFilters={ activeFilters }
          >
            More
          </MoreFilterSelect>
          <Button
            appearance="filters-apply-button-appearance"
            onClick={ onApply }
          >
            Search
          </Button>
        </TopPanelButtons>
      </TopPanel>
    </RootPanel>
  );
};

export default PureCompactFilter;
