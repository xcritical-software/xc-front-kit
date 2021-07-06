import get from 'lodash.get';
import { TypeOptions } from 'react-toastify';
import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components';
import { mergeDeep } from 'utilitify';

import { INotification } from './interfaces';
import { notificationThemeNamespace, defaultNotificationTheme } from './theme';
import {
  ToastContainer,
  Toast,
  ToastBody,
  CloseButton,
  ProgressBar,
} from './styles';

const getNotificationThemeStylesByProperty = ({ theme }: INotification) => (
  propertyPath: string[]
): CSSObject => {
  const notificationTheme = get(theme, notificationThemeNamespace);
  const mergedTheme = mergeDeep(defaultNotificationTheme, notificationTheme);

  return get(mergedTheme, propertyPath);
};

export const getNotificationThemeGeneralStyles = (
  props: INotification
): FlattenSimpleInterpolation => {
  const containerStyles = getNotificationThemeStylesByProperty(props)([
    'container',
  ]);
  const toastStyles = getNotificationThemeStylesByProperty(props)(['toast']);
  const bodyStyles = getNotificationThemeStylesByProperty(props)(['body']);
  const closeButtonStyles = getNotificationThemeStylesByProperty(props)([
    'closeButton',
  ]);
  const progressBarStyles = getNotificationThemeStylesByProperty(props)([
    'progressBar',
  ]);

  return css`
    ${ToastContainer(containerStyles)}
    ${Toast(toastStyles)}
    ${ToastBody(bodyStyles)}
    ${CloseButton(closeButtonStyles)}
    ${ProgressBar(progressBarStyles)}
  `;
};

export const getNotificationThemeTypeStyles = (
  props: INotification
): ((type: TypeOptions) => FlattenSimpleInterpolation) => (type) => {
  const toastStyles = getNotificationThemeStylesByProperty(props)([
    type,
    'toast',
  ]);
  const closeButtonStyles = getNotificationThemeStylesByProperty(props)([
    type,
    'closeButton',
  ]);
  const progressBarStyles = getNotificationThemeStylesByProperty(props)([
    type,
    'progressBar',
  ]);

  return css`
    .Toastify__toast--${type} {
      ${toastStyles};
    }

    .Toastify__close-button--${type} {
      ${closeButtonStyles};
    }

    .Toastify__progress-bar--${type} {
      ${progressBarStyles};
    }
  `;
};
