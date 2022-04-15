import React from 'react';
import { ToastContainer } from 'react-toastify';

import { INotificationContainer } from './interfaces';

export const NotificationContainer: React.FC<INotificationContainer> = ({
  className,
  classNamePrefix,
  ...rest
}) => (
  <div className={className}>
    <ToastContainer
      className={classNamePrefix && `${classNamePrefix}__container`}
      {...rest}
    />
  </div>
);
