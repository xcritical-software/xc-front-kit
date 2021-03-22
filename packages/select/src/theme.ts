import { lighten, darken } from 'polished';

import { colors, ITheme } from '@xcritical/theme';

import { ISelectBaseTheme } from './interfaces';


export const selectThemeNamespace = '@xcritical\\select';

export const selectThemeStyle: ITheme<ISelectBaseTheme> = {
  display: 'inherit',
  paddingBottom: '7px',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '7px',
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  fontSize: '13px',
  fontWeight: 600,
  width: 335,
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colors.GRAY,
  background: colors.GRAY_LIGHT,
  color: colors.CHAROCOAL,

  appearance: {
    default: {
      container: {
        display: 'inline-block',
      },
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
        borderRadius: 3,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      },

      menuScrollbar: {
        background: '#c1c1c1',
        borderRadius: 3,
        hover: {
          background: '#a8a8a8',
        },
        focus: {
          background: '#a8a8a8',
        },
        active: {
          background: '#a8a8a8',
        },
      },

      button: {
        background: colors.WHITE,
        borderColor: colors.GRAY,
        paddingBottom: '7px',
        paddingLeft: '15px',
        paddingRight: '5px',
        paddingTop: '6px',
        minHeight: 'auto',
        hover: {
          color: colors.CHAROCOAL,
          borderColor: colors.PRIMARY,
        },
        focus: {
          boxShadow: 'none',
        },
        filled: {
        },
      },

      indicatorsContainer: {
        background: 'transparent',
        marginBottom: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        lineHeight: 1.69,
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      indicatorSeparator: {
        background: '#A7A7A7',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        lineHeight: 1.69,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 5,
        marginTop: 0,
      },
      dropdownIndicator: {
        background: 'transparent',
        color: '#A7A7A7',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        padding: '0 8px',
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
        marginBottom: 5,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 5,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      loadingIndicator: {
        background: 'transparent',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        hover: {
          background: 'transparent',
        },
        active: {
          background: 'transparent',
        },
      },
      loadingMessage: {
        color: 'inherit',
        fontSize: '13px',
        fontWeight: 'normal',
      },

      input: {
        color: colors.CHAROCOAL,
        background: 'transparent',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        margin: 0,

        height: '16px',
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
        paddingLeft: 0,
        paddingRight: 0,
        prefixSpacing: 15,
        postfixSpacing: 15,
      },

      option: {
        color: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'normal',
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
        padding: '2px 8px',
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
        marginRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
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
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        marginTop: 0,
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
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        marginBottom: 0,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 3,
      },
      noOptionsMessage: {
        color: 'inherit',
        fontSize: '13px',
        fontWeight: 'normal',
      },
      groupHeading: {
        fontWeight: 600,
        fontSize: '100%',
        paddingLeft: '5px',
      },
    },
  },
};
