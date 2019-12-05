import React, {
  useEffect,
  ReactElement,
  useState,
  useRef,
  MutableRefObject,
  useContext,
  useCallback,
} from 'react';
import { ThemeContext } from 'styled-components';

import Button from '@xcritical/button';

import {
  TopPanel,
  WrapperFilters,
  TopPanelButtons,
  WrapperFilterButtons,
  RowWrapper,
  FilterField,
  RootPanel,
  TopPanelTags,
} from './components/styled';
import FilterRowContainer from './filterRowContainer';
import TagContainer from './tagContainer';
import {
  IFilterProps,
  IStateFilter,
  IFilterTheme,
  // IFilter,
} from './interfaces';
import { filterTheme } from './utils';


const Filter: React.FC<IFilterProps> = ({
  filters,
  activeFilters = [],
  addFilter,
  onApply,
  openFilters,
  name,
  resetFilters,
  theme,
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(filterTheme<IFilterTheme>(theme || contextTheme));
  const [isOpen, changeIsOpen] = useState(false);
  const buttonsRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    openFilters();
  }, [openFilters]);

  const onOpen = useCallback(() => {
    changeIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <RootPanel>
      <TopPanel theme={ themeRef.current }>
        <TopPanelTags>
          { activeFilters
            .filter((filter) => filter.column)
            .map((filter) => (
              <TagContainer
                guid={ filter.key }
                filters={ filters }
                filter={ filter }
                name={ name }
                key={ filter.column + filter.condition + filter.value + filter.key }
                theme={ themeRef.current }
                onApply={ onApply }
                onReset={ resetFilters }
              />
            )) }
        </TopPanelTags>

        <TopPanelButtons ref={ buttonsRef }>
          <Button
            appearance="filters-more-button-appearance"
            onClick={ onOpen }
          >
            { isOpen ? 'Close filters' : 'More filters' }
          </Button>
          <Button
            appearance="filters-apply-button-appearance"
            onClick={ onApply }
          >
            Apply
          </Button>
        </TopPanelButtons>
      </TopPanel>

      <WrapperFilters
        open={ isOpen }
        top={ buttonsRef.current && buttonsRef.current.offsetTop }
        theme={ themeRef.current }
      >
        <RowWrapper>
          <FilterField>
            <h3>Filter name</h3>
          </FilterField>
          <FilterField>
            <h3>Condition</h3>
          </FilterField>
          <FilterField>
            <h3>Value</h3>
          </FilterField>
          <FilterField />
        </RowWrapper>
        { activeFilters.map((filter) => (
          <FilterRowContainer
            guid={ filter.key }
            filters={ filters }
            filter={ filter }
            name={ name }
            key={ filter.key }
          />
        )) }
        <WrapperFilterButtons theme={ themeRef.current }>
          <Button
            appearance="filter-add-button-appearance"
            onClick={ addFilter }
          >
            Add new filter
          </Button>
          <Button
            appearance="filter-reset-button-appearance"
            disabled={ !activeFilters.some(({ column }: IStateFilter) => column) }
            onClick={ resetFilters }
          >
            Reset filters
          </Button>
        </WrapperFilterButtons>
      </WrapperFilters>
    </RootPanel>
  );
};

export default Filter;
