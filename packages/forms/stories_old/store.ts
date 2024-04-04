import { createStore, combineReducers, compose } from 'redux';

import { reducer as reduxFormReducer } from '../src';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});

const reducerWithNamespace = combineReducers({
  questionnaires: combineReducers({
    form: reduxFormReducer,
  }),
});

const devtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const composeEnhancers = devtoolsCompose || compose;
const composedMiddleware = composeEnhancers();

const store = createStore(reducer, {}, composedMiddleware);

export const storeWithNamespace = createStore(
  reducerWithNamespace,
  {},
  composedMiddleware
);

export default store;
