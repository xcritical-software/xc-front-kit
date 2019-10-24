import { lighten, darken } from 'polished';

import * as colors from '@xcritical/theme';
import { SelectTheme } from './interfaces';


export const selectThemeNamespace = '@xcritical\\xc-select';

export const selectThemeStyle: SelectTheme = {
  display: 'inherit',
  padding: {
    bottom: 15,
    left: 15,
    right: 15,
    top: 15,
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
  prefixSpacing: 15,
  postfixSpacing: 15,
  borderRadius: 6,
  border: {
    width: 1,
    style: 'solid',
    color: colors.GRAY_LIGHT,
  },
  background: colors.GRAY_LIGHT,
  color: colors.CHAROCOAL,
  fontWeight: 'normal',

  appearance: {
    default: {
      divided: {
        color: '#F0F0F0',
      },
      focus: {
        outline: 0,
      },
      hover: {
        background: '#efefef',
        color: colors.CHAROCOAL,
        fontWeight: 'normal',
      },
      selected: {
        background: '#efefef',
        color: colors.CHAROCOAL,
        fontWeight: 'normal',
      },
      active: {
        background: '#efefef',
        color: colors.CHAROCOAL,
        fontWeight: 'normal',
      },
      disabled: {
        background: '#F0F0F0',
        color: lighten(0.6, colors.CHAROCOAL),
        fontWeight: 'normal',
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
          bottom: 15,
          left: 5,
          right: 5,
          top: 15,
        },
        hover: {
          background: darken(0.1, colors.GRAY_LIGHT),
          color: colors.CHAROCOAL,
          borderColor: '#fff',
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
        display: 'none',
      },
      dropdownIndicator: {
        background: 'transparent',
        color: '#A7A7A7',
        padding: {
          bottom: 0,
          left: 10,
          right: 10,
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
          bottom: 0,
          left: 10,
          right: 10,
          top: 0,
        },
      },

      option: {
        color: 'inherit',
        font: {
          size: 13,
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
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      multiValueLabel: {
        color: 'inherit',
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      multiValueRemove: {
        color: 'inherit',
        background: 'transparent',
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
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
