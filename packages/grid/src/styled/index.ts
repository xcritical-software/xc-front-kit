import styled from 'styled-components';
import { IWrapper } from '../interfaces';
import { getWrapperStyles } from './utils';


export * from './body';
export * from './header';
export * from './totals';


export const Wrapper = styled.div<IWrapper>`
  width: ${({ width }) => `${width}px`};
  overflow: hidden;
  border-radius: 10px;
  ${({ changingColumns }) => {
    if (changingColumns === 'move') {
      return `
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: grabbing;
        `;
    }
    if (changingColumns === 'resize') {
      return `
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: w-resize;
        `;
    }
    return '';
  }}
  ${getWrapperStyles}
`;
