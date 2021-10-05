import GA4React from 'ga-4-react';
import { ReactNode } from 'react';

import { AnalyticsAction } from './actions';

export interface IAnalyticsProviderProps {
  children: ReactNode;
  initSettings: IInitSettings;
}
export interface IYandexPackage {
  post: Function;
}

export interface IEmptyInstance {}

export interface IServiceInstance<T> {
  id: string;
  type: 'empty' | 'withAPI';
  instance: T;
  initialize: () => Promise<any>;
  event: (params: IClickEventWrapper) => void;
  pageView: (url: string) => void;
  activateEventAndPageView: () => void;
  buffer: Function[];
}
export type WrapperForServiceInstance =
  | IServiceInstance<GA4React>
  | IServiceInstance<IYandexPackage>
  | IServiceInstance<IEmptyInstance>;
export interface IClickEventWrapper {
  action?: string;
  category?: string;
  label?: string;
  conversion: string;
  analyticsParams?: any;
}
export interface IGoogleEvent {
  action: string;
  category: string;
  label?: string;
}
export interface IYandexEvent {
  name: string;
  type: string;
  conditions?: any[];
}
export const namesAarray: string[] = ['google', 'yandex'];

export type ServiceNames = typeof namesAarray[number];

export interface IInitSettings {
  serviceIds: {
    google?: string;
    yandex?: string;
  };
}
export type InstanceWrappers = {
  [serviceName: string]: WrapperForServiceInstance;
};

export interface IAnalyticsContext {
  instances: InstanceWrappers;
  instanceConstructors: {
    [serviceName: string]: (
      emptyInstance: WrapperForServiceInstance,
      id: string
    ) => WrapperForServiceInstance;
  };
  runInitializationFlow: (settings: IInitSettings) => Promise<void>;
  tryCallEvent: (params: IClickEventWrapper) => void;
  tryCallPageView: (url: string) => void;
  getState: () => IAnalyticsContext;
}

export type AnaliticsDispatch = (
  action: AnalyticsAction | ((dispatch: any, state: IAnaliticsState) => void)
) => any;

export interface IAnaliticsState {
  instances: { [serviceName: string]: WrapperForServiceInstance };
  instanceMixins: {
    [serviceName: string]: (
      emptyInstance: WrapperForServiceInstance,
      id: string
    ) => WrapperForServiceInstance;
  };
}

export interface IAnaliticsStore {
  getState(): IAnaliticsState;
  analyticsDispatch: AnaliticsDispatch;
}

export interface IAnaliyticsEventParams {
  conversion: string;
  analyticsParams?: EventParams<any>;
}

export type EventParams<T> = T | 'payload';
