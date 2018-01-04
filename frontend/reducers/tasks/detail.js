import { merge } from 'lodash';
import { RECEIVE_TASK, REMOVE_TASK } from '../../actions/task_http_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_TASK:
      newState = {};
      newState[action.task.id] = action.task;
      return merge({}, oldState);

    case REMOVE_TASK:
      newState = merge({}, oldState);
      delete newState[action.task.id];
      return newState;

    default:
      return oldState;
  }
};
