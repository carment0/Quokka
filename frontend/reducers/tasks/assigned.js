import merge from 'lodash/merge';

import { RECEIVE_ASSIGNED_TASKS } from '../../actions/task_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = {};
  switch (action.type) {
    case RECEIVE_ASSIGNED_TASKS:
      action.projects.forEach((project) => {
        newState[project.id] = project;
      });
      return merge({}, oldState, newState);

    default:
      return oldState;
  }
};
