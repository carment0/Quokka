import { combineReducers } from 'redux';

import SessionsReducer from './sessions';
import ErrorsReducer from './errors';
import ProjectsReducer from './projects';
import TasksReducer from './tasks';

const RootReducer = combineReducers({
  sessions: SessionsReducer,
  errors: ErrorsReducer,
  projects: ProjectsReducer,
  tasks: TasksReducer
});

export default RootReducer;
