import { createStore, combineReducers, compose } from 'redux';
import { reducer as reduxFormReducer } from '../src';


const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});


const devtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtoolsCompose || compose;
const composedMiddleware = composeEnhancers();

const store = createStore(
  reducer,
  {},
  composedMiddleware,
);


export default store;
