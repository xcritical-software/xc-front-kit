import { IThemeNamespace } from '@xcritical/theme';

import { selectThemeNamespace } from '../src';
import { ISelectBaseTheme } from '../src/interfaces';


export const customTheme: IThemeNamespace<ISelectBaseTheme> = {
  [selectThemeNamespace]: {
    appearance: {
      default: {
        fontSize: '13px',
        fontWeight: 600,
        paddingBottom: '11px',
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingTop: '11px',
        divided: {
          color: '#4D4D4D',
        },
        background: 'linear-gradient(to top, #474747, #383838)',
        color: '#fff',

        border: {
          width: 1,
          style: 'solid',
          color: '#575857',
        },
        hover: {
          color: '#fff',
          background: 'linear-gradient(to top, #474747, #383838)',
        },
        active: {
          color: '#fff',

          background: 'linear-gradient(to top, #474747, #383838)',
        },

        dropdown: {
          background: '#575857',
          selected: {
            background: '#575857',
          },
          hover: {
            background: '#575857',
          },
        },
        dropdownList: {
          borderRadius: 6,
          padding: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          },
        },
        button: {
          background: 'linear-gradient(to top, #474747, #383838)',
          paddingBottom: '11px',
          paddingLeft: '5px',
          paddingRight: '5px',
          paddingTop: '11px',
          hover: {
            background: 'linear-gradient(to top, #505050, #424242)',

          },
          focus: {
            boxShadow: 'none',
          },
          filled: {
            border: '1px solid darkorange',
          },
        },
        dropdownIndicator: {
          background: 'transparent',
          paddingBottom: 0,
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: 0,
        },
        input: {
          color: '#fff',
        },
        option: {
          background: '#575857',
          color: '#fff',
          hover: {
            background: 'linear-gradient(to top, #474747, #383838)',
          },
          selected: {
            background: 'linear-gradient(to top, #474747, #242424)',
          },
          focus: {
            background: 'linear-gradient(to top, #505050, #424242)',
          },
        },
        singleValue: {
          color: '#fff',
        },
      },
    },
  },
};
