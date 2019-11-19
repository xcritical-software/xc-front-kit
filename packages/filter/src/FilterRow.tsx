import React, {
  useState, useEffect, ReactElement, useCallback,
} from 'react';
import Button from '@xcritical/button';
import Select from '@xcritical/select';
import Input from '@xcritical/input';
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
          filters.find((f) => f.field === filter.column)
        );
      }
    }, [filter, currentFilter, filters]);


    const conditions = currentFilter ? Object.keys(currentFilter.conditions).map((key) => {
      return {
        value: key,
        label: currentFilter.conditions[key].name,
      };
    }) : [];
    const Element = currentFilter ? currentFilter.Element || Input : null;

    const changeColumn = useCallback(
      (value: string) => {
        changeFilter({ field: 'column', value, guid });
      },
      [changeFilter, guid],
    );
    const changeCondition = useCallback(
      (value: string) => changeFilter({ field: 'condition', value, guid }),
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
            value={ filter.column }
            key={ filter.column }
          />
        </FilterField>

        <FilterField>
          <Select
            shouldFitContainer
            onChange={ changeCondition }
            disabled={ !filter.column }
            options={ conditions }
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
