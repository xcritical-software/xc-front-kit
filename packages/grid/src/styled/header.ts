import styled from 'styled-components';

import {
  IHeader,
  IHeaderCell,
  IHeaderCellContent,
  IHeaderCellContentWrapper,
  IRightBorder,
} from '../interfaces';

import {
  getHeaderStyles,
  getHeaderCellStyles,
  getGroupHeaderStyles,
  getRightBorderStyles,
} from './utils';

export const RightBorder = styled.div<IRightBorder>`
  width: 8px;
  position: relative;
  z-index: 9999999;
  opacity: 0;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  cursor: ${({ shouldChangeColumnsWidth }) =>
    shouldChangeColumnsWidth && 'col-resize'};
  ${getRightBorderStyles}
`;

export const Header = styled.thead<IHeader>`
  display: grid;
  position: sticky;
  top: 0;
  z-index: 1;
  ${getHeaderStyles}
`;

export const HeaderGroup = styled.tr<IHeader>`
  display: flex;
  width: 100%;
  ${getGroupHeaderStyles}
`;

export const HeaderCell = styled.th.attrs(({ width }: IHeaderCell) => ({
  style: {
    width: `${width}px`,
  },
}))<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  ${getHeaderCellStyles}

  &:hover > ${RightBorder} {
    opacity: ${({ shouldChangeColumnsWidth }) =>
      shouldChangeColumnsWidth ? '1' : 0};
  }
`;

export const HeaderCellContentWrapper = styled.div<IHeaderCellContentWrapper>`
  width: calc(100% - 8px);
  overflow: hidden;
  display: flex;
  align-items: center;

  cursor: ${({ canSort }) => canSort && 'pointer'};
  ${({ center }) =>
    center &&
    `justify-content: center;
     margin-left: 8px;`}
`;

export const HeaderCellContent = styled.span<IHeaderCellContent>`
  font-size: ${({ theme }) => theme.header?.fontSize};
  color: ${({ theme }) => theme.header?.color};
  padding: ${({ theme }) => theme.header?.padding};
  overflow: ${({ theme }) => theme.header?.overflow};
`;

export const SortIconWrapper = styled.div`
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;
