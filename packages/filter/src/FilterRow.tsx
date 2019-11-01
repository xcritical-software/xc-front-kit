import React, {
  useState, useEffect, ReactElement, useCallback,
} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '@xcritical/button';
import Select from '../../select/src';
import {
  FilterField,
  RowWrapper,
} from './styled';
import {
  xcriticalFiltersChangeFilter,
  xcriticalFiltersRemoveFilter,
} from './actions';
import {
  IFilterRow,
  IFilter,
  IPayloadChangeFilter,
  IFilterRowProps,
  IMapDispatchFilterRow,
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

    const handleRemoveFilter = useCallback(
      () => removeFilter(guid),
      [guid, removeFilter],
    );

    return (
      <RowWrapper>
        <FilterField>
          <Select
            onChange={ changeColumn }
            items={ filterItems }
            value={ filter.column }
          />
        </FilterField>

        <FilterField>
          <Select
            onChange={ changeCondition }
            disabled={ !filter.column }
            items={ conditions }
            value={ filter.condition }
          />
        </FilterField>
        <FilterField>
          { Element
            && filter.condition
            && conditions
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

        <Button onClick={ handleRemoveFilter }>Delete</Button>
      </RowWrapper>
    );
  },
);

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: IFilterRowProps,
): IMapDispatchFilterRow => ({
  changeFilter: (
    changes: IPayloadChangeFilter,
  ): any => dispatch(xcriticalFiltersChangeFilter(changes, name)),
  removeFilter: (guid: string): any => dispatch(xcriticalFiltersRemoveFilter(name, guid)),
});

export default connect(
  null,
  mapDispatchToProps,
)(FilterRow);
