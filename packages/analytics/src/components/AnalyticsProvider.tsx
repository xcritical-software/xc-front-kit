import React, { ReactNode } from 'react';

import { analyticsStore } from '..';
import { createInstanceAction } from '../actions';
import { runInitializationFlow } from '../middleware-actions';
import { IInitSettings } from '../types';

import { AnalyticsContext } from './analytics-context';

export const AnalyticsProvider = (props: {
  children: ReactNode;
  initSettings: IInitSettings;
}) => {
  const { children, initSettings } = props;
  const value = React.useMemo(() => analyticsStore, [analyticsStore]);

  const { serviceIds } = initSettings;
  Object.entries(serviceIds || {}).forEach(([name, serviceId]) => {
    if (serviceId && value.getState().instances[name].type === 'empty') {
      value.analyticsDispatch(createInstanceAction(name, serviceId));
    }
  });
  value.analyticsDispatch(runInitializationFlow(initSettings));

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
