import get from 'lodash.get';
import { TypeOptions } from 'react-toastify';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { INotification } from './interfaces';
import { notificationThemeNamespace } from './theme';


const getNotificationProperty = ({ theme }: INotification) => (propertyPath: string[]) => (
  get(theme, [notificationThemeNamespace, ...propertyPath])
);

export const getNotificationThemeGeneralStyles = (props: INotification):
FlattenSimpleInterpolation => {
  const container = getNotificationProperty(props)(['container']);
  const toast = getNotificationProperty(props)(['toast']);
  const body = getNotificationProperty(props)(['body']);
  const closeButton = getNotificationProperty(props)(['closeButton']);
  const progressBar = getNotificationProperty(props)(['progressBar']);

  return css`
    .Toastify__toast-container {
      ${container};
    }
    
    .Toastify__toast {
      ${toast};
    }
    
    .Toastify__toast-body {
      ${body};
    }
    
    .Toastify__close-button {
      ${closeButton};
    }
  
    .Toastify__progress-bar {
      ${progressBar};
    }
  `;
};

export const getNotificationThemeTypeStyles = (props: INotification):
(type: TypeOptions) => FlattenSimpleInterpolation => (type) => {
  const toast = getNotificationProperty(props)([type, 'toast']);
  const closeButton = getNotificationProperty(props)([type, 'closeButton']);
  const progressBar = getNotificationProperty(props)([type, 'progressBar']);

  return css`
    .Toastify__toast--${type} {
      ${toast};
    }
    
    .Toastify__close-button--${type} {
      ${closeButton};
    }
  
    .Toastify__progress-bar--${type} {
      ${progressBar};
    }
  `;
};
