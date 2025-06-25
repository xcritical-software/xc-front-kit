import styled from 'styled-components';

import { IWrapper } from '../interfaces';

import { getWrapperStyles } from './utils';

export * from './body';
export * from './header';
export * from './totals';

export const Wrapper = styled.div.attrs<IWrapper>(({ $width, $height }) => ({
  style: {
    width: $width,
    height: $height,
  },
}))`
  * {
    box-sizing: border-box;
  }
  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 0px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
  :focus {
    outline: none;
  }

  ${getWrapperStyles}
`;

export const MultiGridWrapper = styled.div<{ height?: string }>`
  display: flex;
  ${({ height }) => height && `height: ${height}`}
`;
