import { IAnaliyticsEventParams } from './types';
import * as actionTypes from './action-types';

export type AnalyticsAction =
  | SetResolvedAction
  | ActivateMethodsAction
  | ApplyBufferAction
  | CreateInstanceAction
  | TryCallEventAction;

export type SetResolvedAction = ReturnType<typeof setResolvedAction>;
export type ActivateMethodsAction = ReturnType<typeof activateMethodsAction>;
export type ApplyBufferAction = ReturnType<typeof applyBufferAction>;
export type CreateInstanceAction = ReturnType<typeof createInstanceAction>;
export type TryCallEventAction = ReturnType<typeof tryCallEventAction>;

export const setResolvedAction = (
  resolvedInstance: any,
  instanceName: string
) =>
  ({
    APIMethod: actionTypes.SET_RESOLVED,
    actionParams: { resolvedInstance, instanceName },
  } as const);

export const activateMethodsAction = (instanceName: string) =>
  ({
    APIMethod: actionTypes.ACTIVATE,
    actionParams: { instanceName },
  } as const);

export const applyBufferAction = (instanceName: string) =>
  ({
    APIMethod: actionTypes.APPLY_BUFFER,
    actionParams: { instanceName },
  } as const);

export function createInstanceAction(serviceName: string, serviceId: string) {
  return {
    APIMethod: actionTypes.CREATE,
    actionParams: {
      serviceName,
      serviceId,
    },
  } as const;
}

export const tryCallEventAction = (actionParams: IAnaliyticsEventParams) =>
  ({
    APIMethod: actionTypes.TRY_CALL_EVENT,
    actionParams,
  } as const);
