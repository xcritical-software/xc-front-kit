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


const groupBy = (xs: any[], key) => xs.reduce((rv, x) => {
  (rv[x[key]] = rv[x[key]] || []).push(x);
  return rv;
}, {});


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
        <TopPanelTags>
          { Object.keys(mergedFilters)
            .map((filterId) => (
              <TagContainer
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
