import { lighten } from 'polished';

import { InlineEditTheme } from '@xcritical/inline-edit';


const generateTheme = (
  baseBgColor: string,
  textColor: string,
): InlineEditTheme => ({
  backgroundColor: baseBgColor,
  color: textColor,
  appearance: {
    default: {
      editButton: {
        focus: {
          border: `2px solid ${lighten(0.6, '#003e6c')}`,
          backgroundColor: '#003e6c',
        },
      },
      actionButtonWrapper: {
        backgroundColor: '#003e6c',
      },
      button: {
        backgroundColor: 'white',
        border: '1px solid blue',
      },
      hover: {
        backgroundColor: lighten(0.6, '#003e6c'),
      },
    },
    custom: {
      editButton: {
        focus: {
          border: `2px solid ${lighten(0.6, '#fff000')}`,
          backgroundColor: '#fff000',
        },
      },
      actionButtonWrapper: {
        backgroundColor: '#fff000',
      },
      button: {
        backgroundColor: '#fff000',
        border: '1px solid #fff000',
      },
      hover: {
        backgroundColor: lighten(0.6, '#000'),
      },
    },
  },

});

export const theme = generateTheme('#fff', '#000');
