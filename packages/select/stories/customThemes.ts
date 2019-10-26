import { IThemeNamespace } from '@xcritical/theme';
import { selectThemeNamespace } from '../src';
import { SelectTheme } from '../src/interfaces';


export const customTheme: IThemeNamespace<SelectTheme> = {
  [selectThemeNamespace]: {
    appearance: {
      default: {
        font: {
          size: 13,
          weight: 600,
        },
        padding: {
          bottom: 11,
          left: 15,
          right: 15,
          top: 11,
        },
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
          padding: {
            bottom: 11,
            left: 5,
            right: 5,
            top: 11,
          },
          hover: {
            background: 'linear-gradient(to top, #505050, #424242)',

          },
          focus: {
            boxShadow: 'none',
          },
        },
        dropdownIndicator: {
          background: 'transparent',
          padding: {
            bottom: 0,
            left: 10,
            right: 10,
            top: 0,
          },
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
