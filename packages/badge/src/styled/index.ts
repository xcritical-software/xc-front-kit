import styled from 'styled-components';
import { IThemeBadgeProps } from '../interfaces';
import { getRootBadgeStyles, getRootBadgeInteractiveStyles } from '../utils';


export const BadgeRoot = styled.span<IThemeBadgeProps>`
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    ${({ theme, appearance = 'default', baseAppearance = 'default' }) => getRootBadgeStyles(theme, appearance, baseAppearance)}
    ${({
    theme, appearance = 'default', baseAppearance = 'default', inverse,
  }) => getRootBadgeInteractiveStyles(theme, appearance, baseAppearance, inverse)}
`;
