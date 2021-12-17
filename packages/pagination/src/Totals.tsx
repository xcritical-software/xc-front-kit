import React from 'react';

import { ITotalsProps } from './interfaces';
import { StyledTotals } from './styles';

export const Totals = React.memo<ITotalsProps>(
  ({ currentPage, pageSize, total }) => {
    const from = (currentPage - 1) * pageSize + 1;
    const to = currentPage * pageSize;

    return (
      <StyledTotals className="at-pagination--totals">
        {`${from} - ${to > total ? total : to} of ${total}`}
      </StyledTotals>
    );
  }
);
