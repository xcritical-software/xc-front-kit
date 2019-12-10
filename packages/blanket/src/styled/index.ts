import styled from 'styled-components';

import {
  blanketAppearanceTheme,
  getBaseStyle,
} from '../utils';
import { IBlanketProps } from '../interfaces';


export const Root = styled.div<IBlanketProps>`
  ${getBaseStyle}
  opacity: ${({
    theme,
    appearance = 'default',
    baseAppearance = 'default',
    isTinted,
  }) => (isTinted ? blanketAppearanceTheme(theme, appearance, baseAppearance, 'opacity') : 0)};
  pointer-events: ${({ canClickThrough }) => (canClickThrough ? 'none' : 'initial')};
`;
