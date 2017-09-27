import merge from 'lodash/merge';

import { RECEIVE_ASSIGNED_TASKS } from '../../actions/project_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = {};
  switch (action.type) {
    case RECEIVE_ASSIGNED_TASKS:
      action.tasks.forEach((task) => {
        newState[task.id] = task;
      });
      return merge({}, oldState, newState);

    default:
      return oldState;
  }
};
