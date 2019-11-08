import { lighten } from 'polished';

import { colors } from '@xcritical/theme';
import { ItemTheme } from './interfaces';


export const itemThemeNamespace = '@xcritical\\xc-item';

export const itemThemeStyle: ItemTheme = {
  paddingBottom: 15,
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 15,
  prefixSpacing: 15,
  postfixSpacing: 15,
  borderRadius: 0,
  font: { weight: 'normal' },
  divided: {
    color: '#F0F0F0',
  },
  focus: {
    outline: '#efefef',
  },
  background: colors.GRAY_LIGHT,
  color: colors.CHAROCOAL,
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
  },
};
