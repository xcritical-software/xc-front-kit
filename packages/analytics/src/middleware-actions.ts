import { AnaliticsDispatch, IAnaliticsState, IInitSettings } from './types';
import * as actions from './actions';

export const runInitializationFlow = (initSettings: IInitSettings) => (
  analyticsDispatch: AnaliticsDispatch,
  state: IAnaliticsState
) => {
  const { serviceIds = {} } = initSettings;

  Promise.all([
    Object.entries(serviceIds).map(([serviceName, serviceId]) => {
      if (serviceId && state.instances[serviceName].type === 'withAPI') {
        return state.instances[serviceName]
          .initialize()
          .then((resolvedInstance) => {
            analyticsDispatch(
              actions.setResolvedAction(resolvedInstance, serviceName)
            );
            analyticsDispatch(actions.activateMethodsAction(serviceName));
            analyticsDispatch(actions.applyBufferAction(serviceName));
          });
      }

      return undefined;
    }),
  ]).then(
    () => {},
    () => {}
  );
};
