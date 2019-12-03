import styled from 'styled-components';
import { colors } from '@xcritical/theme';
import { IThemeBadgeProps } from '../interfaces';


export const BadgeRoot = styled.span<IThemeBadgeProps>`
    background-color: ${colors.GRAY};
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
`;
