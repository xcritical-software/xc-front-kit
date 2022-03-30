import React from 'react';

import Input from '@xcritical/input';

import { ISelectedFilterComponent } from '../../interfaces';
import { ValidationError } from '../styled';

export const FilterValueElement: React.FC<ISelectedFilterComponent> =
  React.memo(
    ({
      currentFilter,
      filterData: { condition = '', value = '' } = {},
      validationError,
      onChange,
      tagConditionsRef,
    }) =>
      currentFilter?.Element ? (
        currentFilter.Element(
          value,
          onChange,
          condition,
          validationError,
          tagConditionsRef
        )
      ) : (
        <>
          <Input
            shouldFitContainer
            value={value || ''}
            disabled={!condition}
            invalid={!!validationError}
            onChange={onChange}
          />
          {validationError && (
            <ValidationError>{validationError}</ValidationError>
          )}
        </>
      )
  );
