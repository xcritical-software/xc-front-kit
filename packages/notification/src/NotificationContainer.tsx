import React from 'react';
import { ToastContainer } from 'react-toastify';

import { INotificationContainer } from './interfaces';

export const NotificationContainer: React.FC<INotificationContainer> = ({
  className,
  ...rest
}) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
);
