import { useInjectReducer, useInjectSaga } from './utils';
import { IInjectProps } from './types';

export const ReduxInject = ({
  children,
  keyName,
  reducerKey,
  sagaKey,
  reducer,
  saga,
  fallback,
  allowSagaUnmount = false,
}: IInjectProps) => {
  const isInjectedReducers = useInjectReducer({
    key: (reducerKey || keyName)!,
    reducer,
  });
  const isInjectedSagas = useInjectSaga({
    key: (sagaKey || keyName)!,
    saga,
    allowSagaUnmount,
  });

  if (!isInjectedReducers || !isInjectedSagas) {
    return fallback ?? null;
  }

  return children;
};
