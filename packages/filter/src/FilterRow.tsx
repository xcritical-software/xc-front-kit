import React, {
  useState, useEffect, FormEvent, ReactElement,
} from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import {
  Select,
  SelectOption,
  FilterField,
  Button,
  RowWrapper,
} from './styled';
import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
} from './actions';
import {
  IFilterRow,
  IFilter,
  ICondition,
  IPayloadChangeFilter,
  IFilterRowProps,
  IMapDispatchFilterRow,
} from './interfaces';


const FilterRow: React.FC<IFilterRow> = ({
  filters,
  filter,
  removeFilter,
  id,
  changeFilter,
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
  }, [filter.column, currentFilter, filters]);

  const handleChange = (value: string, field: string): void => {
    changeFilter({ field, value, id });
    if (field === 'column') {
      changeFilter({ field: 'condition', value: '', id });
      changeFilter({ field: 'value', value: '', id });
    }
  };

  const Element = currentFilter ? currentFilter.Element : null;
  const conditions = currentFilter ? currentFilter.conditions : null;

  return (
    <RowWrapper>
      <FilterField>
        <Select
          id="id_select"
          onChange={ (e: FormEvent<HTMLSelectElement>) => handleChange(e.currentTarget.value, 'column') }
        >
          { !filter.condition && (
            <SelectOption selected>Please select...</SelectOption>
          ) }
          { filters.map(({ displayName, field }: IFilter) => (
            <SelectOption
              key={ displayName }
              value={ field }
              selected={ filter.column === field }
            >
              { displayName }
            </SelectOption>
          )) }
        </Select>
      </FilterField>

      <FilterField>
        <Select
          id="id_select2"
          onChange={ (e: FormEvent<HTMLSelectElement>) => handleChange(e.currentTarget.value, 'condition') }
          disabled={ !filter.column }
        >
          { !filter.condition && (
            <SelectOption selected>Please select...</SelectOption>
          ) }
          { filter.column
            && conditions
            && Object.entries(conditions).map(
              ([condition, { displayName }]: [string, ICondition]) => (
                <SelectOption
                  selected={ filter.condition === condition }
                  key={ displayName }
                  value={ condition }
                >
                  { displayName }
                </SelectOption>
              ),
            ) }
        </Select>
      </FilterField>
      <FilterField>
        { Element
          && filter.condition
          && conditions
          && conditions[filter.condition]
          && conditions[filter.condition].hasValue && (
          <Element
            handleChange={ (value: string) => handleChange(value, 'value') }
            value={ filter.value }
            key={ filter.column }
          />
        ) }
      </FilterField>

      <Button onClick={ () => removeFilter(id) }>Delete</Button>
    </RowWrapper>
  );
};


const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: IFilterRowProps,
): IMapDispatchFilterRow => ({
  changeFilter:
    (changes: IPayloadChangeFilter): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
  removeFilter:
    (id: number): any => dispatch(xcriticalFiltersRemoveFilter(name, id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(FilterRow);
