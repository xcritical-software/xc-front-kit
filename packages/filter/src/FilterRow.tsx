import React, {
  useMemo, ReactElement, useCallback, useRef,
} from 'react';
import Button from '@xcritical/button';

import { OptionTypeBase } from 'react-select';

import {
  FilterField,
  RowWrapper,
} from './components/styled';
import {
  IFilterRow,
} from './interfaces';

import { FilterSelect, ConditionSelect, FilterValueElement } from './components';


const FilterRow: React.FC<IFilterRow> = React.memo(
  ({
    filters,
    filter,
    removeFilter,
    guid,
    onChangeFilter,
  }): ReactElement => {
    const cachedFilterData = useRef(filters.find((f) => f.field === filter.column));
    const currentFilter = useMemo(() => {
      if (
        (filter.column && !cachedFilterData.current)
        || (cachedFilterData?.current?.field !== filter.column)
      ) {
        cachedFilterData.current = filters.find((f) => f.field === filter.column);
      }

      return cachedFilterData.current;
    }, [filter, filters]);


    const onChangeColumn = useCallback(
      ({ value }: OptionTypeBase) => {
        onChangeFilter({ field: 'column', value, guid });
      }, [onChangeFilter, guid],
    );

    const onChangeCondition = useCallback(
      ({ value }: OptionTypeBase) => {
        onChangeFilter({ field: 'condition', value, guid });
      }, [onChangeFilter, guid],
    );

    const onChangeValue = useCallback(
      (value: any) => {
        onChangeFilter({ field: 'value', value, guid });
      }, [onChangeFilter, guid],
    );


    return (
      <RowWrapper>
        <FilterField>
          <FilterSelect
            onChange={ onChangeColumn }
            filters={ filters }
            currentFilter={ currentFilter }
            key={ filter.column }
          />
        </FilterField>

        <FilterField>
          <ConditionSelect
            onChange={ onChangeCondition }
            currentFilter={ currentFilter }
            filterData={ filter }
            key={ filter.condition }
          />
        </FilterField>
        <FilterField>
          <FilterValueElement
            onChange={ onChangeValue }
            currentFilter={ currentFilter }
            filterData={ filter }
            key={ filter.column }
          />
        </FilterField>
        <FilterField>
          <Button appearance="filter-delete-button-appearance" onClick={ removeFilter }>Delete</Button>
        </FilterField>
      </RowWrapper>
    );
  },
);


export default FilterRow;
