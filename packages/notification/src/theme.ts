import { INotificationTheme } from './interfaces';


export const notificationThemeNamespace = '@xcritical\\xc-notification';

export const defaultNotificationTheme: INotificationTheme = {
  container: {
    zIndex: 9999,
    transform: 'translate3d(0, 0, 9999px)',
    position: 'fixed',
    padding: '5px',
    width: '320px',
    boxSizing: 'border-box',
    color: '#fff',
  },
  toast: {
    position: 'relative',
    minHeight: '64px',
    boxSizing: 'border-box',
    marginBottom: '1rem',
    padding: '10px',
    borderRadius: '1px',
    boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    maxHeight: '800px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    direction: 'ltr',
  },
  body: {
    margin: 'auto 0',
    flex: 1,
  },
  closeButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    background: 'transparent',
    outline: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    opacity: 0.7,
    transition: '0.3s ease',
    alignSelf: 'flex-start',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '5px',
    zIndex: 9999,
    opacity: 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transformOrigin: 'left',
  },
  default: {
    toast: {
      background: '#fff',
      color: '#aaa',
    },
    closeButton: {
      color: '#000',
      opacity: 0.3,
    },
    progressBar: {
      background: 'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);',
    },
  },
  info: {
    toast: {
      background: '#3498db',
    },
  },
  warning: {
    toast: {
      background: '#f1c40f',
    },
  },
  success: {
    toast: {
      background: '#07bc0c',
    },
  },
  error: {
    toast: {
      background: '#e74c3c',
    },
  },
};
