import merge from 'lodash/merge';

import { RECEIVE_ASSIGNED_PROJECTS, REMOVE_PROJECT } from '../../actions/project_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_ASSIGNED_PROJECTS:
      newState = {};
      action.projects.forEach((project) => {
        newState[project.id] = project;
      });
      return merge({}, oldState, newState);

    case REMOVE_PROJECT:
      newState = merge({}, oldState);
      delete newState[action.project.id];
      return newState;

    default:
      return oldState;
  }
};
