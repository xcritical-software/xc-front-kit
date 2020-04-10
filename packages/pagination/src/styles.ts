import styled from 'styled-components';

import { getPaginationStyles } from './utils';


export const PaginationWrapper = styled.div`
  ${({ theme }) => getPaginationStyles(theme, ['wrapper'])};
`;

export const TotalInfo = styled.div`
  ${({ theme }) => getPaginationStyles(theme, ['totalInfo'])};
`;
