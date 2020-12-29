import { GREEN, STRONG_CYAN } from '@xcritical/theme';

import { inputThemeNamespace } from '../src';


export const customTheme = {
  [inputThemeNamespace]: {
    appearance: {
      default: {
        width: '300px',
      },
      custom: {
        border: `1px solid ${STRONG_CYAN}`,
        clearWrapper: {
          fill: '#f1a',
          hover: {
            fill: '#fba',
          },
          disabled: {
            fill: 'green',
            hover: {
              fill: 'red',
            },
          },
          invalid: {
            fill: '#f57178',
            hover: {
              fill: '#a8050e',
            },
          },

        },
        hover: {
          border: `1px solid ${GREEN}`,
        },
        disabled: {
          border: '1px solid #71f5d4',
          hover: {
            border: '1px solid #06bf91',
          },
        },
      },
    },
  },
};
