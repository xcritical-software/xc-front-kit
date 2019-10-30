import { darken, lighten, mix } from 'polished';

import { inputThemeNamespace } from '@xcritical-old/xc-input';


const padding = 18;
const baseBgColor = '#fff';
const textColor = '#000';
const borderColor = '#555';
const focusColor = '#999';
const invalidColor = '#E71D36';

export const customTheme = {
  [inputThemeNamespace]: {
    appearance: {
      default: {
        prefixSpacing: 5,
        suffixSpacing: 5,
        addonBackgroundColor: '#ccc',
        height: 40,
        padding: {
          bottom: padding,
          left: padding,
          right: padding,
          top: padding,
        },
        background: baseBgColor,
        color: textColor,
        font: {
          weight: 600,
          size: 14,
        },
        border: {
          width: 1,
          style: 'solid',
          color: borderColor,
        },
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomRight: 20,
          bottomLeft: 20,
        },
        control: {
          height: 40,
          width: '100%',
        },
        focus: {
          color: focusColor,
        },
        selected: {
          background: darken(0.05, baseBgColor),
          color: textColor,
          height: 40,
          border: {
            width: 1,
            style: 'solid',
            color: borderColor,
          },
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomRight: 20,
            bottomLeft: 20,
          },
        },
        active: {
          background: darken(0.1, baseBgColor),
          color: textColor,
          height: 40,
          border: {
            width: 1,
            style: 'solid',
            color: borderColor,
          },
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomRight: 20,
            bottomLeft: 20,
          },
        },
        disabled: {
          background: baseBgColor,
          color: mix(0.5, baseBgColor, textColor),
          height: 40,
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomRight: 20,
            bottomLeft: 20,
          },
        },
        invalid: {
          background: baseBgColor,
          color: textColor,
          height: 40,
          border: {
            width: 1,
            style: 'solid',
            color: invalidColor,
          },
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomRight: 20,
            bottomLeft: 20,
          },
        },
      },
      dark: {
        background: darken(0.75, baseBgColor),
        color: lighten(0.95, textColor),
        border: {
          color: lighten(0.95, borderColor),
        },
        focus: {
          color: lighten(0.95, textColor),
        },
        selected: {
          background: darken(0.75, baseBgColor),
          color: lighten(0.95, textColor),
          border: {
            color: lighten(0.95, borderColor),
          },
        },
        active: {
          background: darken(0.75, baseBgColor),
          color: lighten(0.55, textColor),
          border: {
            color: lighten(0.95, borderColor),
          },
        },
        disabled: {
          background: darken(0.95, baseBgColor),
          color: mix(0.5, baseBgColor, textColor),
          border: {
            color: lighten(0.95, borderColor),
          },
        },
        invalid: {
          background: darken(0.75, baseBgColor),
          color: lighten(0.95, textColor),
          border: {
            color: invalidColor,
          },
        },
      },
      withCustomPrefixSuffix: {
        prefix: {
          width: '15%',
        },
        suffix: {
          width: '15%',
        },
      },
    },
  },
};
