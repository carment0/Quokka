import { merge } from 'lodash';
import { RECEIVE_ASSIGNED_TASK_LIST, RECEIVE_ASSIGNED_TASK } from '../../actions/task_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ASSIGNED_TASK_LIST:
      const newState = {};

      action.taskList.forEach((task) => {
        newState[task.id] = task;
      });

      return newState;

    case RECEIVE_ASSIGNED_TASK:
      return merge({}, oldState, { [action.task.id]: action.task });

    default:
      return oldState;
  }
};
