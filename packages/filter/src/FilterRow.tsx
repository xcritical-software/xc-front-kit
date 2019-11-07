import React, {
  useState, useEffect, ReactElement, useCallback,
} from 'react';
import Button from '@xcritical/button';
import Select from '../../select/src';
import {
  FilterField,
  RowWrapper,
} from './styled';
import {
  IFilterRow,
  IFilter,
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
    const [currentFilter, changeCurrentFilter] = useState<IFilter>();

    useEffect(() => {
      if (
        (filter.column && !currentFilter)
        || (currentFilter && currentFilter.field !== filter.column)
      ) {
        changeCurrentFilter(
          filters.find((f: IFilter) => f.field === filter.column),
        );
      }
    }, [filter, currentFilter, filters]);

    const conditions = currentFilter ? currentFilter.conditions : {};
    const Element = currentFilter ? currentFilter.Element : null;

    const changeColumn = useCallback(
      (value: string) => {
        changeFilter({ field: 'column', value, guid });
        changeFilter({ field: 'condition', value: '', guid });
        changeFilter({ field: 'value', value: '', guid });
      },
      [changeFilter, guid],
    );
    const changeCondition = useCallback(
      (value: string) => changeFilter({ field: 'condition', value, guid }),
      [changeFilter, guid],
    );
    const changeValue = useCallback(
      (value: string) => changeFilter({ field: 'value', value, guid }),
      [changeFilter, guid],
    );

    return (
      <RowWrapper>
        <FilterField>
          <Select
            shouldFitContainer
            onChange={ changeColumn }
            items={ filterItems }
            value={ filter.column }
            key={ filter.column }
          />
        </FilterField>

        <FilterField>
          <Select
            shouldFitContainer
            onChange={ changeCondition }
            disabled={ !filter.column }
            items={ conditions }
            value={ filter.condition }
            key={ filter.condition }
          />
        </FilterField>
        <FilterField>
          { Element
            && filter.condition
            && conditions[filter.condition]
            && conditions[filter.condition].hasValue && (
            <Element
              handleChange={ changeValue }
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
