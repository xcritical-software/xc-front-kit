import { darken } from 'polished';
import styled from 'styled-components';

import { badgeThemeNamespace } from '@xcritical/badge';
import { colors } from '@xcritical/theme';

export const Head = styled.h1<any>`
  font-size: ${({ size }: any) => `${size}px`};
`;

export const theme = {
  [badgeThemeNamespace]: {
    backgroundColor: darken(0.1, colors.GRAY),
    ghost: {
      borderColor: darken(0.1, colors.GRAY),
      background: darken(0.1, colors.WHITE),
    },
    appearance: {
      default: {},
      primary: {
        background: darken(0.1, colors.PRIMARY),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.PRIMARY),
          borderColor: darken(0.1, colors.PRIMARY),
          background: darken(0.1, colors.WHITE),
        },
      },
      secondary: {
        background: darken(0.1, colors.SECONDARY),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.SECONDARY),
          borderColor: darken(0.1, colors.SECONDARY),
          background: darken(0.1, colors.WHITE),
        },
      },
      success: {
        background: darken(0.1, colors.SUCCESS),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.SUCCESS),
          borderColor: darken(0.1, colors.SUCCESS),
          background: darken(0.1, colors.WHITE),
        },
      },
      danger: {
        background: darken(0.1, colors.DANGER),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.DANGER),
          borderColor: darken(0.1, colors.DANGER),
          background: darken(0.1, colors.WHITE),
        },
      },
      warning: {
        background: darken(0.1, colors.WARNING),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.WARNING),
          borderColor: darken(0.1, colors.WARNING),
          background: darken(0.1, colors.WHITE),
        },
      },
      info: {
        background: darken(0.1, colors.INFO),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.INFO),
          borderColor: darken(0.1, colors.INFO),
          background: darken(0.1, colors.WHITE),
        },
      },
      dark: {
        background: darken(0.1, colors.DARK),
        color: darken(0.1, colors.WHITE),
        ghost: {
          color: darken(0.1, colors.DARK),
          borderColor: darken(0.1, colors.DARK),
          background: darken(0.1, colors.WHITE),
        },
      },
      light: {
        background: darken(0.1, colors.LIGHT),
        color: darken(0.1, colors.CHAROCOAL),
        ghost: {
          color: darken(0.1, colors.LIGHT),
          borderColor: darken(0.1, colors.LIGHT),
          background: darken(0.1, colors.CHAROCOAL),
        },
      },
    },
  },
};

export const appearances = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'light',
  'dark',
];

export const Table = styled.div`
  display: table;
  min-width: 280px;
`;

export const Row = styled.div`
  display: table-row;
`;

export const Cell = styled.div`
  display: table-cell;
`;

export function capitalize(str: string) {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return str.charAt(0).toUpperCase() + str.slice(1);
}
