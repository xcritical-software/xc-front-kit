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
  SearchInputWrapper,
  Prefix,
  Postfix,
  MoreFilterSelect,
  Search,
  Tag,
} from './components';

import { IFilterComponentProps, IFilterTheme } from './interfaces';
import { filterTheme, groupBy } from './utils';


const PureCompactFilter: React.FC<IFilterComponentProps> = ({
  filters,
  activeFilters = [],
  searchInput,
  isSearchable = true,
  disabled = false,
  name,
  theme,
  prefix,
  postfix,
  onApply,
  onResetFilters,
  onChangeFilters,
  onSearchInputChange,
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(filterTheme<IFilterTheme>(theme || contextTheme));

  const mergedFilters = useMemo(() => groupBy(
    activeFilters
      .filter((filter) => filter.column)
      .filter(({ column }) => !filters.find(({ field }) => field === column)?.isHidden),
    'column',
  ), [activeFilters, filters]);


  return (
    <RootPanel>
      <TopPanel theme={ themeRef.current }>
        { prefix && <Prefix theme={ themeRef.current }>{ prefix }</Prefix> }

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
                disabled={ disabled }
                onApply={ onApply }
              />
            )) }
        </TopPanelTags>

        <TopPanelButtons>
          <MoreFilterSelect
            filters={ filters }
            selectedFilters={ activeFilters }
            disabled={ disabled }
            onChange={ onChangeFilters }
          >
            More
          </MoreFilterSelect>

          <Button
            appearance="filters-reset"
            baseAppearance="link"
            disabled={ disabled }
            onClick={ onResetFilters }
          >
            Reset
          </Button>

          <Button
            appearance="filters-apply"
            baseAppearance="primary"
            disabled={ disabled }
            onClick={ onApply }
          >
            Search
          </Button>
        </TopPanelButtons>

        { postfix && <Postfix theme={ themeRef.current }>{ postfix }</Postfix> }
      </TopPanel>
    </RootPanel>
  );
};

export default PureCompactFilter;
