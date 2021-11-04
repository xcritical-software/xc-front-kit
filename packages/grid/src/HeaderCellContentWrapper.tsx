import React from 'react';

import { SortAscendingIcon, SortDescendingIcon } from './icons';
import { SortIconWrapper } from './styled';
import { GridSort } from './consts';

export const HeaderCellContentWrapper = ({ theme, content, sortOrder }) => (
  <>
    <span className="at-grid__header-cell__content_span">{content}</span>
    <SortIconWrapper className="at-grid__sort-icon-wrapper">
      {sortOrder === GridSort.ASC && (
        <SortAscendingIcon size={theme.sortIconSize} />
      )}
      {sortOrder === GridSort.DESC && (
        <SortDescendingIcon size={theme.sortIconSize} />
      )}
    </SortIconWrapper>
  </>
);
