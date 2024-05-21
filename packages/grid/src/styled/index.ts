import styled from 'styled-components';

import { IWrapper } from '../interfaces';

import { getWrapperStyles } from './utils';

export * from './body';
export * from './header';
export * from './totals';

export const Wrapper = styled.div.attrs<IWrapper>(({ $width, $height }) => ({
  style: {
    width: `${$width}px`,
    height: `${$height}px`,
  },
}))`
  * {
    box-sizing: border-box;
  }
  overflow: auto;

  ${getWrapperStyles}
`;

export const MultiGridWrapper = styled.div<{ height?: string }>`
  display: flex;
  ${({ height }) => height && `height: ${height}`}
`;
