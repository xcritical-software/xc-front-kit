import React, { createContext } from 'react';

import { emptyInstance } from '../analytics-instances/empty';
import { googleInstanceConstructor } from '../analytics-instances/google';
import {
  IAnaliticsState,
  IAnaliticsStore,
  IAnaliyticsEventParams,
} from '../types';
import { AnalyticsAction, TryCallEventAction } from '../actions';
import * as actionTypes from '../action-types';

import { reducerObject } from './reducer-object';

let defaultState: IAnaliticsState = {
  instances: {
    google: emptyInstance(),
  },
  instanceMixins: {
    google: googleInstanceConstructor,
  },
};

function analyticsReducer(state: IAnaliticsState, action: AnalyticsAction) {
  const reduce = reducerObject[action.APIMethod];

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
  },
  eventDispatch(action: IAnaliyticsEventParams) {
    if (action)
      defaultState = analyticsReducer(defaultState, {
        APIMethod: 'TRY_CALL_EVENT',
        actionParams: action,
      });
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
          APIMethod: actionTypes.TRY_CALL_EVENT,
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
  const dispatch = React.useContext(AnalyticsContext).eventDispatch;

  return (event: T) => dispatch(event);
}

export const AnalyticsContext = createContext(analyticsStore);
