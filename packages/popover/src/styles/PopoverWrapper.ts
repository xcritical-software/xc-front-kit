import styled from 'styled-components';

import { IWrapperProps } from '../interfaces';

import { getPopperProperty } from './utils';


export const PopoverWrapper = styled.div<IWrapperProps>`
  position: relative;
  ${(props) => getPopperProperty(props)(['wrapper'])}
`;
