import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// define how the store should look like
const rootReducer = combineReducers({});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
