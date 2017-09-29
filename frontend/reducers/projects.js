import { combineReducers } from 'redux';

import AssignedProjectReducer from './projects/assigned';
import AdministratedProjectReducer from './projects/administrated';
import ProjectDetailReducer from './projects/detail';

export default combineReducers({
  detail: ProjectDetailReducer,
  assigned: AssignedProjectReducer,
  administrated: AdministratedProjectReducer
});
