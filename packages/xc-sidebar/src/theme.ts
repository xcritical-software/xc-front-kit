import { colors } from '@xcritical/theme';


export const sidebarThemeNamespace = '@xcritical\\xc-sidebar';

export const sidebarThemeStyle = {
  color: colors.CHAROCOAL,
  minWidth: 30,
  maxWidth: 400,
  padding: 0,
  leftWidth: 91,
  sidebarContainer: {
    color: colors.CHAROCOAL,
    height: '100vh',
    position: 'fixed',
    display: 'flex',
  },
  navContainer: {
    backgroundColor: colors.GRAY_LIGHT,
    height: 'calc(100vh + 10px)',
    width: '90px',
  },
  childContainer: {
    backgroundColor: colors.GRAY_LIGHT,
  },
  responsiveContainer: {
    minHeight: '100vh',
    display: 'flex',
  },
  separatorContainer: {
    width: '10px',
    height: '100vh',
    cursor: 'w-resize',
    zIndex: 9999,
  },
  separator: {
    color: colors.CHAROCOAL,
    width: '2px',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.BLUE,
  },
  antiSelect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
  },
  closeOpenButton: {
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '10%',
    color: 'black',
    right: '9px',
    borderRadius: '50%',
    border: '1px solid gray',
    padding: '3px',
    backgroundColor: 'white',
    transition: '.5s',
    transitionTimingFunction: 'linear',
    cursor: 'pointer',
  },
  appearance: {
    default: {
      minWidth: 30,
      maxWidth: 400,
      leftWidth: 91,
    },
  },
};
