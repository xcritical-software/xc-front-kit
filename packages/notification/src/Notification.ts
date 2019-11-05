import styled from 'styled-components';

import { INotification } from './interfaces';
import { getNotificationThemeGeneralStyles, getNotificationThemeTypeStyles } from './utils';
import { NotificationContainer } from './NotificationContainer';

import {
  ToastContainer,
  Toast,
  ToastBody,
  CloseButton,
  ProgressBar,
  BounceAnimation,
  ZoomAnimation,
  FlipAnimation,
  SlideAnimation,
} from './styles';


export const Notification = styled(NotificationContainer)<INotification>`
  ${ToastContainer};
  ${Toast};
  ${ToastBody};
  ${CloseButton};
  ${ProgressBar};
  ${BounceAnimation};
  ${ZoomAnimation};
  ${FlipAnimation};
  ${SlideAnimation};
  
  ${getNotificationThemeGeneralStyles}
  ${(props) => getNotificationThemeTypeStyles(props)('default')}
  ${(props) => getNotificationThemeTypeStyles(props)('info')}
  ${(props) => getNotificationThemeTypeStyles(props)('warning')}
  ${(props) => getNotificationThemeTypeStyles(props)('success')}
  ${(props) => getNotificationThemeTypeStyles(props)('error')}
`;
