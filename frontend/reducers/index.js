import { combineReducers } from 'redux';

import SessionsReducer from './sessions';
import ErrorsReducer from './errors';
import ProjectsReducer from './projects';

const RootReducer = combineReducers({
  sessions: SessionsReducer,
  errors: ErrorsReducer,
  projects: ProjectsReducer
});

export default RootReducer;
