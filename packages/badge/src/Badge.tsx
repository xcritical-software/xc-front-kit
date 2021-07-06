import styled from 'styled-components';

import { IThemeBadgeProps } from './interfaces';
import { getRootBadgeStyles, getRootBadgeInteractiveStyles } from './utils';

export const Badge = styled.span<IThemeBadgeProps>`
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  ${({ theme, appearance = 'default', baseAppearance = 'default', ghost }) => ({
    ...getRootBadgeStyles(theme, appearance, baseAppearance),
    ...getRootBadgeInteractiveStyles(theme, appearance, baseAppearance, ghost),
  })}
`;
