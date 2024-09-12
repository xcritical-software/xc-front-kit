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
  getPinnedStyles,
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

export const DragAndDropButton = styled.div`
  width: 15px;
  position: relative;
  z-index: 9999999;
  cursor: move;
  align-content: center;
`;

export const Header = styled.thead<IHeader>`
  display: grid;
  position: sticky;
  top: 0;
  z-index: 2;
  ${getHeaderStyles}
`;

export const HeaderGroup = styled.tr<IHeader>`
  display: flex;
  width: 100%;
  ${getGroupHeaderStyles}
`;

export const HeaderCell = styled.th.attrs(
  ({ $width, isDragging }: IHeaderCell) => ({
    style: {
      width: `${$width}px`,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : undefined,
    },
  })
)<IHeaderCell>`
  float: left;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  whitespace: nowrap;
  text-overflow: ellipsis;
  z-index: 0;
  ${({ autoFitLastColumn }) => autoFitLastColumn && 'flex-grow: 1;'};

  transition: width transform 0.2s ease-in-out;
  ${(props) => getHeaderCellStyles(props)}
  ${getPinnedStyles}

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
  font-size: ${({ theme }) => theme.headerCellContent?.fontSize};
  color: ${({ theme }) => theme.headerCellContent?.color};
  padding: ${({ theme }) => theme.headerCellContent?.padding};
  overflow: ${({ theme }) => theme.headerCellContent?.overflow};
`;

export const SortIconWrapper = styled.div`
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;
