import { lighten, darken } from 'polished';

import * as colors from '@xcritical/theme';
import { SelectTheme } from './interfaces';


export const selectThemeNamespace = '@xcritical\\select';

export const selectThemeStyle: SelectTheme = {
  display: 'inherit',
  padding: {
    bottom: 7,
    left: 15,
    right: 15,
    top: 7,
  },
  margin: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  font: {
    size: 13,
    weight: 600,
  },
  width: 335,
  borderRadius: 6,
  border: {
    width: 1,
    style: 'solid',
    color: colors.GRAY_LIGHT,
  },
  background: colors.GRAY_LIGHT,
  color: colors.CHAROCOAL,

  appearance: {
    default: {
      divided: {
        color: '#F0F0F0',
      },
      hover: {
        background: '#efefef',
        color: colors.CHAROCOAL,

      },
      selected: {
        background: '#efefef',
        color: colors.CHAROCOAL,

      },
      active: {
        background: '#efefef',
        color: colors.CHAROCOAL,

      },
      disabled: {
        background: '#F0F0F0',
        color: lighten(0.6, colors.CHAROCOAL),

        opacity: 0.75,
      },

      dropdown: {
        background: colors.GRAY_LIGHT,
        selected: {
          background: colors.GRAY_LIGHT,
        },
        hover: {
          background: colors.GRAY_LIGHT,
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
        background: colors.GRAY_LIGHT,
        padding: {
          bottom: 7,
          left: 15,
          right: 15,
          top: 7,
        },
        hover: {
          background: darken(0.1, colors.GRAY_LIGHT),
          color: colors.CHAROCOAL,
        },
        focus: {
          boxShadow: 'none',
        },
      },

      indicatorsContainer: {
        background: 'transparent',
        margin: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      indicatorSeparator: {
        background: '#A7A7A7',
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },

        margin: {
          bottom: 0,
          left: 10,
          right: 10,
          top: 0,
        },
      },
      dropdownIndicator: {
        background: 'transparent',
        color: '#A7A7A7',
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      clearIndicator: {
        color: '#A7A7A7',
        background: 'transparent',
        margin: {
          bottom: 5,
          left: 0,
          right: 0,
          top: 5,
        },
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      loadingIndicator: {
        background: 'transparent',
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      loadingMessage: {
        color: 'inherit',
        font: {
          size: 13,
          weight: 'normal',
        },
      },

      input: {
        color: colors.CHAROCOAL,
        background: 'transparent',
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        margin: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
        focus: {
          background: 'transparent',
        },
        selected: {
          background: 'transparent',
        },
      },
      placeholder: {
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      labelText: {
        padding: {
          left: 0,
          right: 0,
        },
        prefixSpacing: 15,
        postfixSpacing: 15,
      },

      option: {
        color: 'inherit',
        font: {
          size: 'inherit',
          weight: 'normal',
        },
        hover: {
          background: '#efefef',
        },
        active: {
          background: '#efefef',
        },
        focus: {
          background: '#efefef',
        },
        selected: {
          background: darken(0.1, colors.GRAY_LIGHT),
        },
      },

      valueContainer: {
        background: 'transparent',
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 3,
        },
        border: {
          width: 0,
        },
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      singleValue: {
        color: 'inherit',
        height: '100%',
        display: 'inline-block',
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      multiValue: {
        color: 'inherit',
        height: '100%',
        display: 'inline-flex',
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
        margin: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
      },
      multiValueLabel: {
        color: 'inherit',
        height: '100%',
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        margin: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
      },
      multiValueRemove: {
        color: '#A7A7A7',
        fill: '#A7A7A7',
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        margin: {
          bottom: 0,
          left: 4,
          right: 4,
          top: 3,
        },
      },
      noOptionsMessage: {
        color: 'inherit',
        font: {
          size: 13,
          weight: 'normal',
        },
      },
    },
  },
};
