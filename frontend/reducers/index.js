import { combineReducers } from 'redux';

import SessionsReducer from './sessions';
import ErrorsReducer from './errors';
import ProjectsReducer from './projects';
import TasksReducer from './tasks';
import UsersReducer from './users_by_company';

const RootReducer = combineReducers({
  sessions: SessionsReducer,
  errors: ErrorsReducer,
  projects: ProjectsReducer,
  tasks: TasksReducer,
  users: UsersReducer
});

export default RootReducer;
