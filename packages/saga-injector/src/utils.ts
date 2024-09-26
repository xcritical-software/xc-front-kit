import { useStore } from 'react-redux';
import { useState, useLayoutEffect, useRef } from 'react';

import { IInjectorStore, IInjectReducer, IInjectSaga } from './types';

/**
 * Inject reducer to current store
 */
export const useInjectReducer = (reducerForInject: IInjectReducer) => {
  const store = useStore() as IInjectorStore;
  const [isInjected, setIsInjected] = useState(false);

  useLayoutEffect(() => {
    if (!reducerForInject.reducer) {
      setIsInjected(true);

      if (process.env.NODE_ENV === 'development') {
        console.info(
          `%cReducer for inject not found. Key: "${reducerForInject.key}"`,
          'background: #f3b840; color: black'
        );
      }

      return;
    }

    const { reducer, key } = reducerForInject;

    const hasReducer = Reflect.has(store.injectedReducers, key);

    if (!hasReducer) {
      store.injectedReducers[key] = reducer;
      const nextReducer = store.createReducer(store.injectedReducers);
      store.replaceReducer(nextReducer);

      if (process.env.NODE_ENV === 'development') {
        console.info(
          `%cReducer with key "${key}" injected`,
          'background: #ad7; color: black'
        );
      }
    }

    setIsInjected(true);
  }, []);

  return isInjected;
};

// TODO: delete useFirstMountState after front-kit update
export function useFirstMountState(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

/**
 * Inject saga to current store
 */
export const useInjectSaga = ({
  allowSagaUnmount,
  key,
  saga,
  reloadSagaIfChanged,
}: IInjectSaga) => {
  const store = useStore() as IInjectorStore;
  const [isInjected, setIsInjected] = useState(false);
  const isFirstMount = useFirstMountState();

  useLayoutEffect(() => {
    if (isFirstMount) return;

    const hasSaga = !!store.injectedSagas[key];

    if (hasSaga && saga && reloadSagaIfChanged) {
      setIsInjected(false);
      const oldDescriptor = store.injectedSagas[key];

      if (oldDescriptor) {
        oldDescriptor?.task.cancel();
        delete store.injectedSagas[key];
      }

      store.injectedSagas[key] = {
        saga,
        task: store.runSaga(saga),
      };

      if (process.env.NODE_ENV === 'development') {
        console.info(
          `%cSaga with key "${key}" 're-injected`,
          'background: #ad7; color: black'
        );
      }

      setIsInjected(true);
    }
  }, [saga]);

  useLayoutEffect(() => {
    if (!saga) {
      setIsInjected(true);

      if (process.env.NODE_ENV === 'development') {
        console.info(
          `%cSaga for inject not found. Key: "${key}"`,
          'background: #f3b840; color: black'
        );
      }

      return;
    }

    const hasSaga = !!store.injectedSagas[key];

    if (!hasSaga) {
      store.injectedSagas[key] = {
        saga,
        task: store.runSaga(saga),
      };

      if (process.env.NODE_ENV === 'development') {
        console.info(
          `%cSaga with key "${key}" injected`,
          'background: #ad7; color: black'
        );
      }
    }

    setIsInjected(true);

    // eslint-disable-next-line consistent-return
    return () => {
      const oldDescriptor = store.injectedSagas[key];

      if (oldDescriptor && allowSagaUnmount) {
        oldDescriptor?.task.cancel();
        delete store.injectedSagas[key];
      }
    };
  }, []);

  return isInjected;
};
