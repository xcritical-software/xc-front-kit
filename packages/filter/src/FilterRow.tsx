import React, {
  useMemo, ReactElement, useCallback,
} from 'react';
import Button from '@xcritical/button';
import Select from '@xcritical/select';
import Input from '@xcritical/input';
import { OptionTypeBase } from 'react-select';
import {
  FilterField,
  RowWrapper,
} from './styled';
import {
  IFilterRow,
} from './interfaces';


const FilterRow: React.FC<IFilterRow> = React.memo(
  ({
    filters,
    filter,
    removeFilter,
    guid,
    changeFilter,
    filterItems,
  }): ReactElement => {
    const currentFilter = useMemo(() => {
      if (
        (filter.column && !currentFilter)
        || (currentFilter && currentFilter.field !== filter.column)
      ) {
        return filters.find((f) => f.field === filter.column);
      }
      return null;
    }, [filter, filters]);

    const selectedFilterName = useMemo(() => {
      const $filter = filters.find((f) => f.field === filter.column);
      if ($filter) {
        return {
          value: $filter.field,
          label: $filter.displayName,
        };
      }
      return null;
    }, [filter.column, filters]);

    const conditions: OptionTypeBase[] = useMemo(() => (currentFilter
      ? Object.keys(currentFilter.conditions).map((key) => ({
        ...currentFilter.conditions[key],
        value: key,
        label: currentFilter.conditions[key].name,
      }))
      : []), [currentFilter]);

    const selectedConditions = useMemo(() => conditions.find((f) => f.value === filter.condition),
      [conditions, filter]);

    const Element = currentFilter ? currentFilter.Element || Input : null;

    const changeColumn = useCallback(
      ({ value }: OptionTypeBase) => {
        changeFilter({ field: 'column', value, guid });
      },
      [changeFilter, guid],
    );
    const changeCondition = useCallback(
      ({ value }: OptionTypeBase) => changeFilter({ field: 'condition', value, guid }),
      [changeFilter, guid],
    );
    const changeValue = useCallback(
      (value) => changeFilter({ field: 'value', value, guid }),
      [changeFilter, guid],
    );


    return (
      <RowWrapper>
        <FilterField>
          <Select
            shouldFitContainer
            onChange={ changeColumn }
            options={ filterItems }
            value={ selectedFilterName }
            key={ filter.column }
          />
        </FilterField>

        <FilterField>
          <Select
            shouldFitContainer
            onChange={ changeCondition }
            disabled={ !filter.column }
            options={ conditions }
            value={ selectedConditions }
            key={ filter.condition }
          />
        </FilterField>
        <FilterField>
          { Element
            && selectedConditions
            && selectedConditions.hasValue && (
            <Element
              onChange={ changeValue }
              value={ filter.value }
              key={ filter.column }
              isEdit
            />
          ) }
        </FilterField>
        <div style={ { float: 'right' } }>
          <Button appearance="filter-delete-button-appearance" onClick={ removeFilter }>Delete</Button>
        </div>
      </RowWrapper>
    );
  },
);


export default FilterRow;
