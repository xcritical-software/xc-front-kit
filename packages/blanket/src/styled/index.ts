import styled from 'styled-components';

import {
  getBlanketThemeStylesByProperty,
  getBaseStyle,
} from '../utils';
import { IBlanketProps } from '../interfaces';


export const Root = styled.div<IBlanketProps>`
  ${({ theme }: IBlanketProps) => getBaseStyle({ theme })}
  opacity: ${({
    theme,
    isTinted,
  }: IBlanketProps) => (isTinted ? getBlanketThemeStylesByProperty({ theme }).opacity : 0)};
  pointer-events: ${({ canClickThrough }: IBlanketProps) => (canClickThrough ? 'none' : 'initial')};
`;
