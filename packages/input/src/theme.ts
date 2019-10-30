import * as colors from '@xcritical/theme';

import { generateApperance } from './utils/themeTools';


export const inputThemeNamespace = '@xcritical\\xc-input';

export const inputThemeStyle = {
  background: colors.GRAY_LIGHT,
  color: colors.CHAROCOAL,
  prefixSpacing: 5,
  suffixSpacing: 5,
  addonBackgroundColor: colors.GRAY_LIGHT,
  height: 30,
  padding: {
    top: 0,
    right: 20,
    bottom: 0,
    left: 20,
  },
  font: {
    weight: 600,
    size: 14,
    lineHeightRatio: 1.69,
  },
  border: {
    width: 1,
    style: 'solid',
    color: colors.CHAROCOAL,
  },
  borderRadius: {
    topLeft: 3,
    topRight: 3,
    bottomRight: 3,
    bottomLeft: 3,
  },
  transition: {
    property: 'all',
    duration: '0.3s',
    timingFunction: 'ease-in-out',
    delay: '0s',
  },
  control: {
    height: 30,
    width: '100%',
  },
  appearance: {
    default: generateApperance({
      background: colors.GRAY_LIGHT,
      color: colors.CHAROCOAL,
      height: 30,
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20,
      },
      font: {
        weight: 600,
        size: 14,
        lineHeightRatio: 1.69,
      },
      border: {
        width: 1,
        style: 'solid',
        color: colors.CHAROCOAL,
      },
      borderRadius: {
        topLeft: 3,
        topRight: 3,
        bottomRight: 3,
        bottomLeft: 3,
      },
      transition: {
        property: 'all',
        duration: '0.3s',
        timingFunction: 'ease-in-out',
        delay: '0s',
      },
    }),
  },
};
