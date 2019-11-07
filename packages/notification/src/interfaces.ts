import { ToastContainerProps } from 'react-toastify';
import { CSSObject } from 'styled-components';


interface IToast {
  toast?: CSSObject;
  closeButton?: CSSObject;
  progressBar?: CSSObject;
}

export interface INotificationTheme extends IToast {
  container?: CSSObject;
  body?: CSSObject;

  default?: IToast;
  info?: IToast;
  warning?: IToast;
  success?: IToast;
  error?: IToast;
}

export interface INotification extends ToastContainerProps {
  theme?: {
    [namespace: string]: INotificationTheme;
  };
}

export interface INotificationContainer extends ToastContainerProps {
  className?: string;
}
