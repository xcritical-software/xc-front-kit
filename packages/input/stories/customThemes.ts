import { darken, lighten, mix } from 'polished';

import { inputThemeNamespace } from '../src';


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
        height: 40,
        paddingBottom: padding,
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: padding,
        background: baseBgColor,
        color: textColor,
        fontWeight: 600,
        fontSize: 14,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor,
        borderRadius: 20,
        control: {
          height: 40,
          width: 'auto',
        },
        input: {
          height: 40,
        },
        focus: {
          color: focusColor,
        },
        selected: {
          background: darken(0.05, baseBgColor),
          color: textColor,
          height: 40,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor,
          borderRadius: 20,
        },
        active: {
          background: darken(0.1, baseBgColor),
          color: textColor,
          height: 40,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor,
        },
        disabled: {
          background: baseBgColor,
          color: mix(0.5, baseBgColor, textColor),
          height: 40,
        },
        invalid: {
          background: baseBgColor,
          color: textColor,
          height: 40,
          borderColor: invalidColor,
        },
      },
      dark: {
        background: darken(0.75, baseBgColor),
        color: lighten(0.95, textColor),
        borderColor: lighten(0.95, borderColor),
        focus: {
          color: lighten(0.95, textColor),
        },
        selected: {
          background: darken(0.75, baseBgColor),
          color: lighten(0.95, textColor),
          borderColor: lighten(0.95, borderColor),
        },
        active: {
          background: darken(0.75, baseBgColor),
          color: lighten(0.55, textColor),
          borderColor: lighten(0.95, borderColor),
        },
        disabled: {
          background: darken(0.95, baseBgColor),
          color: mix(0.5, baseBgColor, textColor),
          borderColor: lighten(0.95, borderColor),
        },
        invalid: {
          background: darken(0.75, baseBgColor),
          color: lighten(0.95, textColor),
          borderColor: invalidColor,
        },
      },
    },
  },
};
