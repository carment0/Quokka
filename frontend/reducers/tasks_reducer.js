import merge from 'lodash/merge';

import {
  RECEIVE_TASKS,
  RECEIVE_TASK,
  REMOVE_TASK
} from '../actions/task_actions';

const TaskReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_TASKS:
      const nextState = merge({}, oldState);
      action.tasks.forEach((task) => { nextState[task.id] = task; });
      return nextState;
    case RECEIVE_TASK:
      return merge({}, oldState, { [action.task.id]: action.task });
    case REMOVE_TASK:
      const newState = merge({}, oldState);
      delete newState[action.task.id];
      return newState;
    default:
      return oldState;
  }
};

export default TaskReducer;
