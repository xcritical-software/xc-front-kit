import React from 'react';

import { ITotalsProps } from './interfaces';
import { StyledTotals } from './styles';

export const Totals = React.memo<ITotalsProps>(
  ({ currentPage, pageSize, total, className = '' }) => {
    const from = (currentPage - 1) * pageSize + 1;
    const to = currentPage * pageSize;

    return (
      <StyledTotals className="at-pagination__totals">
        {`${from} - ${to > total ? total : to} of ${total}`}
      </StyledTotals>
    );
  }
);
