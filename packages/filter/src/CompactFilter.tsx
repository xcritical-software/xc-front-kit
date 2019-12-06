import React, {
  useEffect,
  ReactElement,
  useRef,
  MutableRefObject,
  useContext,
} from 'react';
import { ThemeContext } from 'styled-components';

import Button from '@xcritical/button';

import {
  TopPanel,
  TopPanelButtons,
  RootPanel,
  TopPanelTags,
  MoreFilterSelect,
} from './components';
import TagContainer from './tagContainer';
import {
  IFilterProps,
  IFilterTheme,
  // IFilter,
} from './interfaces';
import { filterTheme } from './utils';


const PureCompactFilter: React.FC<IFilterProps> = ({
  filters,
  activeFilters = [],
  onApply,
  openFilters,
  name,
  resetFilters,
  onChangeFilters,
  theme,
}): ReactElement => {
  const contextTheme = useContext(ThemeContext);
  const themeRef = useRef(filterTheme<IFilterTheme>(theme || contextTheme));
  const buttonsRef: MutableRefObject<any> = useRef();


  useEffect(() => {
    openFilters();
  }, [openFilters]);


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
                key={ filter.key }
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
