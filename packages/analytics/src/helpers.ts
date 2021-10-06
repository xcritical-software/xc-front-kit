import { createInstanceAction } from './actions';
import { runInitializationFlow } from './middleware-actions';
import { IInitSettings } from './types';

import { analyticsStore } from '.';

export const initAnalytics = (initSettings: IInitSettings) => {
  const { serviceIds } = initSettings;
  Object.entries(serviceIds || {}).forEach(([name, serviceId]) => {
    const instance = analyticsStore.getState().instances[name];

    if (serviceId && (!instance || instance?.type === 'empty')) {
      analyticsStore.analyticsDispatch(createInstanceAction(name, serviceId));
    }
  });
  analyticsStore.analyticsDispatch(runInitializationFlow(initSettings));
};
