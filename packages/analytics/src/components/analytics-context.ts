import React, { createContext } from 'react';

import { emptyInstance } from '../analytics-instances/empty';
import { googleInstanceConstructor } from '../analytics-instances/google';
import { yandexInstanceConstructor } from '../analytics-instances/yandex';
import {
  IAnaliticsState,
  IAnaliticsStore,
  IAnaliyticsEventParams,
} from '../types';
import { AnalyticsAction } from '../actions';
import * as actionTypes from '../action-types';

import { reducerObject } from './reducer-object';

let defaultState: IAnaliticsState = {
  instances: {
    google: emptyInstance(),
    yandex: emptyInstance(),
  },
  instanceMixins: {
    google: googleInstanceConstructor,
    yandex: yandexInstanceConstructor,
  },
};

function analyticsReducer(state: IAnaliticsState, action: AnalyticsAction) {
  const reduce = reducerObject[action.gtagAPIMethod];

  return reduce ? reduce(state, action) : state;
}

export const analyticsStore: IAnaliticsStore = {
  getState() {
    return defaultState;
  },
  analyticsDispatch(
    action: AnalyticsAction | ((dispatch: any, state: IAnaliticsState) => void)
  ) {
    if (action) {
      if (typeof action !== 'function') {
        defaultState = analyticsReducer(defaultState, action);
      } else {
        action(this.analyticsDispatch, this.getState());
      }
    }

    return action;
  },
};

export function createAnalyticsMiddleware(eventMap: {
  [actionType: string]: IAnaliyticsEventParams;
}) {
  return (_store: any) => (next: any) => (action: any) => {
    if (
      typeof action !== 'function' &&
      action?.type &&
      Object.keys(eventMap).length
    ) {
      const { conversion = undefined, analyticsParams = undefined } =
        eventMap[action.type] || {};

      if (conversion)
        analyticsStore.analyticsDispatch({
          gtagAPIMethod: actionTypes.TRY_CALL_EVENT,
          actionParams: {
            conversion,
            analyticsParams:
              analyticsParams === 'payload' ? action.payload : analyticsParams,
          },
        });
    }

    return next(action);
  };
}

export function useAnalyticsDispatch<T extends IAnaliyticsEventParams>() {
  const dispatch = React.useContext(AnalyticsContext).analyticsDispatch;

  return (event: T) =>
    dispatch({
      gtagAPIMethod: actionTypes.TRY_CALL_EVENT,
      actionParams: event,
    });
}

export const AnalyticsContext = createContext(analyticsStore);
