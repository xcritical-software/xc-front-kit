import { lighten } from 'polished';

import { InlineEditTheme } from './interfaces';


export const inlineEditThemeNamespace = '@xcritical\\inline-edit';

export const defaultInlineEditTheme: InlineEditTheme = {
  background: 'transparent',
  borderRadius: 3,
  boxSizing: 'border-box',
  border: '2px solid transparent',
  display: 'inline-block',
  maxWidth: '100%',
  transition: 'background 0.2s',
  paddingBottom: '7px',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '7px',
  lineHeight: 1.69,
  cursor: 'pointer',
  appearance: {
    default: {
      readViewContentWrapper: {
        backgroundColor: '#ccc',
      },
      editButton: {
        appearance: 'none',
        background: 'transparent',
        border: 0,
        display: 'inline-block',
        lineHeight: 1,
        margin: 0,
        padding: 0,
        outline: 0,
        focus: {
          border: `2px solid ${lighten(0.6, '#ccc')}`,
          background: '#ccc',
        },
      },
      actionButtonsWrapper: {
        display: 'flex',
        flexShrink: 0,
        marginTop: '5px',
        position: 'absolute',
        right: 0,
        top: '100%',
      },
      actionButtonWrapper: {
        backgroundColor: '#f8f9fa',
        borderRadius: '3px',
        boxSizing: 'border-box',
        margin: '0 2px',
      },
      button: {
        backgroundColor: '#f8f9fa',
        cursor: 'pointer',
        verticalAlign: 'middle',
        border: '1px solid transparent',
        display: 'inline-flex',
        borderRadius: '3px',
      },
      contentWrapper: {
        maxWidth: '100%',
        position: 'relative',
      },
      hover: {
        backgroundColor: lighten(0.15, '#ccc'),
      },
    },
  },
};
