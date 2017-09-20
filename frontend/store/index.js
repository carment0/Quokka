import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// define how the store should look like
import RootReducer from '../reducers/root_reducer';

const store = (
  createStore(RootReducer, applyMiddleware(thunk, logger))
);

export default store;
