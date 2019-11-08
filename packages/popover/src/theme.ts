import { IPopperTheme } from './interfaces';


export const popperThemeNamespace = '@xcritical\\xc-popper';

export const defaultPopperTheme: IPopperTheme = {
  content: {
    offset: '5px',
    background: '#fff',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '2px',
  },
  arrow: {
    offset: '10px',
    size: '5px',
    background: '#fff',
    border: {
      width: '1px',
      color: '#ddd',
    },
  },
};
