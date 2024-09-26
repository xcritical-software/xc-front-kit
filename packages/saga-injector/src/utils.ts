import { useStore } from 'react-redux';
import { useEffect, useState } from 'react';

import { IInjectorStore, IInjectReducer, IInjectSaga } from './types';

/**
 * Inject reducer to current store
 */
export const useInjectReducer = (reducerForInject: IInjectReducer) => {
  const store = useStore() as IInjectorStore;
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
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

/**
 * Inject saga to current store
 */
export const useInjectSaga = ({ allowSagaUnmount, key, saga }: IInjectSaga) => {
  const store = useStore() as IInjectorStore;
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
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

    let hasSaga = !!store.injectedSagas[key];

    // TODO: find another way for hot reloading
    // if (process.env.NODE_ENV === 'development') {
    //   // for hot reloading
    //   const oldDescriptor = store.injectedSagas[key];

    //   if (hasSaga && oldDescriptor?.saga !== saga) {
    //     oldDescriptor?.task.cancel();
    //     hasSaga = false;
    //   }
    // }

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
      let oldDescriptor = store.injectedSagas[key];

      if (oldDescriptor && allowSagaUnmount) {
        oldDescriptor?.task.cancel();
        delete store.injectedSagas[key];
      }
    };
  }, []);

  return isInjected;
};
