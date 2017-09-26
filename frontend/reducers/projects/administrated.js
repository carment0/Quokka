import merge from 'lodash/merge';

import { RECEIVE_ADMINISTRATED_PROJECTS } from '../../actions/project_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = {};
  switch (action.type) {
    case RECEIVE_ADMINISTRATED_PROJECTS:
      action.projects.forEach((project) => {
        newState[project.id] = project;
      });
      return merge({}, oldState, newState);

    default:
      return oldState;
  }
};
