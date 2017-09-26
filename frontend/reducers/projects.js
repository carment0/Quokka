import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import AssignedProjectReducer from './projects/assigned';
import { RECEIVE_PROJECTS, RECEIVE_PROJECT, REMOVE_PROJECT } from '../actions/project_actions';


const AllProjectReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_PROJECTS:
      const nextState = merge({}, oldState);
      action.projects.forEach((project) => { nextState[project.id] = project; });
      return nextState;

    case RECEIVE_PROJECT:
      return merge({}, oldState, { [action.project.id]: action.project });

    case REMOVE_PROJECT:
      const newState = merge({}, oldState);
      delete newState[action.project.id];
      return newState;

    default:
      return oldState;
  }
};

export default combineReducers({
  all: AllProjectReducer,
  assigned: AssignedProjectReducer
});