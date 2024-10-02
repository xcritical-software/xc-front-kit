import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

export type createStoreType = (
  baseReducers?: {},
  options?: {
    persistedState?: object;
    preMiddleware?: any[];
    postMiddleware?: any[];
  }
) => any;

const $createStore: createStoreType = (
  baseReducers = {},
  { persistedState = {}, preMiddleware = [], postMiddleware = [] } = {}
) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: any[] = [
    ...preMiddleware,
    sagaMiddleware,
    ...postMiddleware,
  ];

  const createReducer = (injectedReducers = {}) =>
    combineReducers({
      ...baseReducers,
      ...injectedReducers,
    });

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  // eslint-disable-next-line dot-notation
  const composeEnhancers =
    typeof window !== 'undefined'
      ? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) ||
        compose
      : compose;
  const composedMiddleware = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(
    createReducer(baseReducers),
    persistedState,
    composedMiddleware
  ) as any;

  store.runSaga = sagaMiddleware.run;
  store.createReducer = createReducer;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return store;
};

export default $createStore;
