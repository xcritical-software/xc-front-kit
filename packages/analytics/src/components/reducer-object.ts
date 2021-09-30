import { setIn } from 'utilitify';

import { IAnaliticsState } from '../types';
import {
  AnalyticsAction,
  ActivateMethodsAction,
  ApplyBufferAction,
  CreateInstanceAction,
  SetResolvedAction,
  TryCallEventAction,
} from '../actions';
import * as actionTypes from '../action-types';

export const reducerObject = {
  [actionTypes.SET_RESOLVED]: setResolvedCase,
  [actionTypes.TRY_CALL_EVENT]: tryCallEventCase,
  [actionTypes.CREATE]: createCase,
  [actionTypes.ACTIVATE]: activateCase,
  [actionTypes.APPLY_BUFFER]: applyBufferCase,
};

function setResolvedCase(state: IAnaliticsState, action: AnalyticsAction) {
  const {
    actionParams: { resolvedInstance, instanceName: nameForResolve },
  } = action as SetResolvedAction;

  return setIn(
    state,
    resolvedInstance,
    `instances[${nameForResolve}].instance`
  );
}

function tryCallEventCase(state: IAnaliticsState, action: AnalyticsAction) {
  const { actionParams } = action as TryCallEventAction;
  let isAnyBufferReplenished: boolean = false;
  Object.values(state.instances).forEach((instance) => {
    instance.event(actionParams);

    if (instance.type === 'empty') {
      isAnyBufferReplenished = true;
    }
  });

  return isAnyBufferReplenished ? { ...state } : state;
}

function createCase(state: IAnaliticsState, action: AnalyticsAction) {
  const {
    actionParams: { serviceId, serviceName },
  } = action as CreateInstanceAction;
  const mixIn = state.instanceMixins[serviceName];
  const instanceToMix = state.instances[serviceName];

  return setIn(
    state,
    mixIn(instanceToMix, serviceId),
    `instances[${serviceName}]`
  );
}

function activateCase(state: IAnaliticsState, action: AnalyticsAction) {
  const {
    actionParams: { instanceName },
  } = action as ActivateMethodsAction;
  state.instances[instanceName].activateEventAndPageView();

  return { ...state };
}

function applyBufferCase(state: IAnaliticsState, action: AnalyticsAction) {
  const {
    actionParams: { instanceName },
  } = action as ApplyBufferAction;
  const bufferToApply = state.instances[instanceName].buffer;
  bufferToApply.forEach((bufferedAction) =>
    bufferedAction.apply(state.instances[instanceName])
  );

  return setIn(state, [], `instances[${instanceName}].buffer`);
}
