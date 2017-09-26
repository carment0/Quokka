import { combineReducers } from 'redux';

import SessionErrorReducer from './errors/session';

export default combineReducers({
  session: SessionErrorReducer
});
