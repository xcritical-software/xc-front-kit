import React, { useContext, useMemo } from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';

import Button from '@xcritical/button';
import Input from '@xcritical/input';

import {
  TopPanel,
  TopPanelButtons,
  RootPanel,
  TopPanelTags,
  SearchInputWrapper,
  Prefix,
  Postfix,
  MoreFilterSelect,
  Search,
  Tag,
} from './components';

import { IFilterComponentProps, IFilterTheme } from './interfaces';
import { getFilterTheme, groupBy } from './utils';


const PureCompactFilter: React.FC<IFilterComponentProps> = ({
  filters,
  activeFilters = [],
  searchInput,
  isSearchable = true,
  disabled = false,
  isAutoSelectFirstCondition = false,
  isAutoOpenAddedTag = false,
  isTagsVisible = true,
  moreName = 'More',
  resetName = 'Reset',
  searchName = 'Search',
  name,
  theme,
  prefix,
  postfix,
  onApply,
  onResetFilters,
  onChangeFilters,
  onSearchInputChange,
}) => {
  const contextTheme = useContext(ThemeContext);

  const filterTheme = useMemo(() => (
    getFilterTheme<IFilterTheme>(theme ?? contextTheme)
  ), [theme, contextTheme]);

  const mergedFilters = useMemo(() => groupBy(
    activeFilters
      .filter((filter) => filter.column)
      .filter(({ column }) => !filters.find(({ field }) => field === column)?.isHidden),
    'column',
  ), [activeFilters, filters]);


  return (
    <ThemeProvider theme={ filterTheme }>
      <RootPanel>
        <TopPanel>
          { prefix && <Prefix>{ prefix }</Prefix> }

          {
            isSearchable
              ? (
                <SearchInputWrapper>
                  <Input
                    prefix={ <Search /> }
                    value={ searchInput }
                    disabled={ disabled }
                    onChange={ onSearchInputChange }
                    appearance="filters-search"
                  />
                </SearchInputWrapper>
              )
              : null
          }

          { isTagsVisible && (
            <TopPanelTags>
              { Object.keys(mergedFilters).map((filterId) => (
                <Tag
                  name={ name }
                  key={ filterId }
                  filters={ filters }
                  filterId={ filterId }
                  conditions={ mergedFilters[filterId] }
                  disabled={ disabled }
                  filterTheme={ filterTheme }
                  isAutoSelectFirstCondition={ isAutoSelectFirstCondition }
                  isAutoOpenAddedTag={ isAutoOpenAddedTag }
                  onApply={ onApply }
                />
              )) }
            </TopPanelTags>
          ) }

          <TopPanelButtons>
            <MoreFilterSelect
              filters={ filters }
              selectedFilters={ activeFilters }
              disabled={ disabled }
              isAutoOpenAddedTag={ isAutoOpenAddedTag }
              filterTheme={ filterTheme }
              onChange={ onChangeFilters }
            >
              { moreName }
            </MoreFilterSelect>

            <Button
              appearance="filters-reset"
              baseAppearance="link"
              disabled={ disabled }
              onClick={ onResetFilters }
            >
              { resetName }
            </Button>

            <Button
              appearance="filters-apply"
              baseAppearance="primary"
              disabled={ disabled }
              onClick={ onApply }
            >
              { searchName }
            </Button>
          </TopPanelButtons>

          { postfix && <Postfix>{ postfix }</Postfix> }
        </TopPanel>
      </RootPanel>
    </ThemeProvider>
  );
};

export default PureCompactFilter;
