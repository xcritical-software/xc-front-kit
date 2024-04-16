import { darken, lighten } from 'polished';

import { gridThemeNamespace } from '../src';

export const generateTheme = (color: string) => {
  const theme = {
    [gridThemeNamespace]: {
      evenRowBackground: lighten(0.4, color),
      selectedRowBackgroundColor: lighten(0.1, color),
      borderRadius: 15,
      emptyHeaderCellBackground: lighten(0.4, color),
      movingHeaderCellBackgroungColor: lighten(0.1, color),
      header: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.3, color),
        height: 50,
      },
      row: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.6, color),
      },
      totals: {
        color: darken(0.4, color),
        backgroundColor: lighten(0.1, color),
        height: 40,
      },
    },
  };

  return theme;
};
