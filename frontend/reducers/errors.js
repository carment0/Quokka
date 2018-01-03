import { combineReducers } from 'redux';

import SessionErrorReducer from './errors/session';
import ProjectErrorReducer from './errors/project';

export default combineReducers({
  session: SessionErrorReducer,
  project: ProjectErrorReducer
});
