import { inputThemeNamespace } from '../src/theme';

export const customTheme1 = {
  [inputThemeNamespace]: {
    appearance: {
      default: {
        width: '300px',
      },
      custom: {
        border: '1px solid "#17a2b8"',
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
          filled: {
            fill: 'yellow',
          },
        },
        hover: {
          border: '1px solid #2DD070',
        },
        disabled: {
          border: '1px solid #71f5d4',
          hover: {
            border: '1px solid #06bf91',
          },
        },
        invalid: {
          hover: {
            border: '1px solid #850000',
          },
        },
        filled: {
          background: '#aff6fa',
        },
      },
    },
  },
};

export const additionalTheme = {
  [inputThemeNamespace]: {
    appearance: {
      default: {
        width: '300px',
        borderRadius: '3px',
        padding: '12px',
        fontSize: '14px',
        border: '1px solid rgba(153, 153, 153, 0.5)',
        clearWrapper: {
          disabled: {
            opacity: 0,
          },
          filled: {
            opacity: 0.5,
          },
        },
        hover: {
          border: '1px solid #999999',
        },
        focus: {
          border: '1px solid #333333',
        },
        active: {
          border: '1px solid #333333',
        },
        filled: {
          border: '1px solid #32D5EB',
        },
        invalid: {
          border: '1px solid #FF443A',
        },
        disabled: {
          border: '1px solid #999999',
          background: '#EEEEEE',
          opacity: 0.5,
        },
      },
    },
  },
};
