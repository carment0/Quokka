import { combineReducers } from 'redux';

import SessionErrorReducer from './errors/session';
import ProjectErrorReducer from './errors/project';
import TaskErrorReducer from './errors/task';

export default combineReducers({
  session: SessionErrorReducer,
  project: ProjectErrorReducer,
  task: TaskErrorReducer
});
