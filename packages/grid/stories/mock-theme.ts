import { IThemeNamespace } from '@xcritical/theme';
import { gridThemeNamespace } from '../src/components/theme/theme';
import { ITableTheme } from '../src/interfaces';


export const mockTheme: IThemeNamespace<ITableTheme> = {
  [gridThemeNamespace]: {
    evenRowColor: 'red',
    width: '50%',
  },
};
