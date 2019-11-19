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

import Button from '@xcritical/button';

import {
  TopPanel,
  WrapperFilters,
  TopPanelTags,
  TopPanelButtons,
  WrapperFilterButtons,
  RowWrapper,
  FilterField,
} from './styled';
import FilterRowContainer from './filterRowContainer';
import TagContainer from './tagContainer';
import {
  IFilterProps,
  IStateFilter,
  // IFilter,
} from './interfaces';
import { IFilterTheme, filterTheme } from './utils';
import { OptionTypeBase } from 'react-select';


const Filter: React.SFC<IFilterProps> = ({
  filters,
  activeFilters = [],
  addFilter,
  apply,
  openFilters,
  name,
  resetFilters,
  theme,
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(filterTheme<IFilterTheme>(theme || contextTheme));
  const [isOpen, changeIsOpen] = useState(true);
  const buttonsRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    openFilters();
  }, [openFilters]);

  const _filters = useMemo(
    () => filters.reduce(
      (acc: OptionTypeBase[], { field, displayName }) => ([
        ...acc,
        { label: displayName, value: field },
      ]),
      [],
    ),
    [filters],
  );

  const handleOpen = useCallback(() => {
    changeIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div>
      <TopPanel theme={ themeRef.current }>
        <TopPanelTags>
          { activeFilters.map((filter) => (
            <TagContainer
              guid={ filter.key }
              filters={ filters }
              filter={ filter }
              name={ name }
              key={ filter.column + filter.condition + filter.value + filter.key }
              theme={ themeRef.current }
              filterItems={ _filters }
            />
          )) }
        </TopPanelTags>

        <TopPanelButtons ref={ buttonsRef }>
          <Button
            appearance="filters-more-button-appearance"
            onClick={ handleOpen }
          >
            { isOpen ? 'Close filters' : 'More filters' }
          </Button>
          <Button
            appearance="filters-apply-button-appearance"
            onClick={ apply }
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
        </RowWrapper>
        { activeFilters.map((filter: IStateFilter) => (
          <FilterRowContainer
            filterItems={ _filters }
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
    </div>
  );
};

export default Filter;
