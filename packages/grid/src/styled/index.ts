import styled from 'styled-components';
import { IWrapper } from '../interfaces';
import { getWrapperStyles } from './utils';


export * from './body';
export * from './header';
export * from './totals';


export const Wrapper = styled.div.attrs(({ width }: IWrapper) => ({
  style: {
    width: `${width}px`,
  },
}))`
  * {
    box-sizing: border-box;
  }
  overflow: hidden;
  ${({ changingColumns }) => {
    if (changingColumns === 'move') {
      return `
        user-select: none;
        cursor: grabbing;
        `;
    }
    if (changingColumns === 'resize') {
      return `
        user-select: none;
        cursor: w-resize;
        `;
    }
    return '';
  }}
  ${getWrapperStyles}
`;


export const MultiGridWrapper = styled.div<{ height?: string }>`
  display: flex;
  ${({ height }) => height && `height: ${height}`}
`;
