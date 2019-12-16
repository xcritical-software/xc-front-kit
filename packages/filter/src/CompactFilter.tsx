import React, {
  ReactElement,
  useRef,
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
  IFilterComponentProps,
  IFilterTheme,
} from './interfaces';
import { filterTheme, groupBy } from './utils';


const PureCompactFilter: React.FC<IFilterComponentProps> = ({
  filters,
  activeFilters = [],
  onApply,
  searchInput,
  isSearchable = true,
  name,
  onResetFilters,
  onChangeFilters,
  onSearchInputChange,
  theme,
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(filterTheme<IFilterTheme>(theme || contextTheme));

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
              />
            )) }
        </TopPanelTags>

        <TopPanelButtons>
          <MoreFilterSelect
            onChange={ onChangeFilters }
            filters={ filters }
            selectedFilters={ activeFilters }
          >
            More
          </MoreFilterSelect>

          <Button
            appearance="filters-reset"
            baseAppearance="link"
            onClick={ onResetFilters }
          >
            Reset
          </Button>

          <Button
            appearance="filters-apply"
            baseAppearance="primary"
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
