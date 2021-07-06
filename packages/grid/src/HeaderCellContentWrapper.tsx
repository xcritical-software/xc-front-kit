import React from 'react';

import { SortAscendingIcon, SortDescendingIcon } from './icons';
import { SortIconWrapper } from './styled';
import { GridSort } from './consts';

export const HeaderCellContentWrapper = ({ theme, content, sortOrder }) => (
  <>
    <span>{content}</span>
    <SortIconWrapper>
      {sortOrder === GridSort.ASC && (
        <SortAscendingIcon size={theme.sortIconSize} />
      )}
      {sortOrder === GridSort.DESC && (
        <SortDescendingIcon size={theme.sortIconSize} />
      )}
    </SortIconWrapper>
  </>
);
