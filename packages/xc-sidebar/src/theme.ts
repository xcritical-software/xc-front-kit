import { colors } from '@xcritical/theme';


export const sidebarThemeNamespace = '@xcritical\\xc-sidebar';

export const sidebarThemeStyle = {
  color: colors.CHAROCOAL,
  transition: '.5s',
  padding: 0,
  sidebarContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    color: colors.CHAROCOAL,
    height: '100vh',
    position: 'fixed',
    zIndex: 100,
  },
  navContainer: {
    backgroundColor: colors.GRAY_LIGHT,
    height: 'calc(100vh + 10px)',
    width: '90px',
  },
  childContainer: {
    backgroundColor: colors.GRAY_LIGHT,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  responsiveContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  separatorContainer: {
    width: '10px',
    height: '100vh',
    cursor: 'w-resize',
    zIndex: 999999,
  },
  separator: {
    color: colors.CHAROCOAL,
    width: '2px',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.BLUE,
    right: '0',
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
};
