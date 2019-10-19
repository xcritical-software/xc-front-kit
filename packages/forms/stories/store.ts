import { createStore, combineReducers, compose } from 'redux';
import { reducer as reduxFormReducer } from '../src';


const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});


const { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ } = window;
const composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedMiddleware = composeEnhancers();

const store = createStore(
  reducer,
  {},
  composedMiddleware,
);


export default store;
