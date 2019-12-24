import { lighten } from 'polished';

import { InlineEditTheme } from './interfaces';


export const inlineEditThemeNamespace = '@xcritical\\inline-edit';

export const defaultInlineEditTheme: InlineEditTheme = {
  background: 'transparent',
  borderRadius: 20,
  boxSizing: 'border-box',
  border: '2px solid transparent',
  display: 'inline-block',
  maxWidth: '100%',
  transition: 'background 0.2s',
  editButton: {
    appearance: 'none',
    background: 'transparent',
    border: 0,
    display: 'inline-block',
    lineHeight: 1,
    margin: 0,
    padding: 0,
    outline: 0,
  },
  actionButtonsWrapper: {
    display: 'flex',
    flexShrink: 0,
    marginTop: '10px',
    position: 'absolute',
    right: 0,
    top: '100%',
  },
  actionButtonWrapper: {
    backgroundColor: '#ccc',
    borderRadius: '10px',
    boxShadow: '0 5px 5px -5px black, 0 0 1px black',
    boxSizing: 'border-box',
    fontSize: '14px',
    zIndex: 200,
  },
  button: {
    backgroundColor: '#ccc',
  },
  contentWrapper: {
    maxWidth: '100%',
    position: 'relative',
  },
  appearance: {
    default: {
      editButton: {
        focus: {
          border: `2px solid ${lighten(0.6, '#ccc')}`,
          background: '#ccc',
        },
      },
      hover: {
        background: lighten(0.6, '#ccc'),
      },
    },
  },
};
