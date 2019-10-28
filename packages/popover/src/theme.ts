import { IPopperTheme } from './interfaces';


export const popperThemeNamespace = '@xcritical\\xc-popper';

export const defaultPopperTheme: IPopperTheme = {
  content: {
    offset: '5px',
    background: '#fff',
    padding: {
      top: '5px',
      right: '5px',
      bottom: '5px',
      left: '5px',
    },
    border: {
      width: '1px',
      radius: '2px',
      color: '#ddd',
    },
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
