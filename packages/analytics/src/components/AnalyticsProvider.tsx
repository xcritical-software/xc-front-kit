import React, { ReactNode } from 'react';

import { analyticsStore } from '..';
import { initAnalytics } from '../helpers';
import { IInitSettings } from '../types';

import { AnalyticsContext } from './analytics-context';

export const AnalyticsProvider = (props: {
  children: ReactNode;
  initSettings?: IInitSettings;
}) => {
  const { children, initSettings } = props;
  const value = React.useMemo(() => analyticsStore, [analyticsStore]);

  if (initSettings) initAnalytics(initSettings);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
