import { createStore, combineReducers, compose } from 'redux';
import { modalReducer } from '../src';


const reducer = combineReducers({
  modal: modalReducer,
});


const devtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtoolsCompose || compose;
const composedMiddleware = composeEnhancers();

export const store = createStore(
  reducer,
  {},
  composedMiddleware,
);
