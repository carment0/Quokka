import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import AssignedTaskReducer from './tasks/assigned';

import { RECEIVE_TASK_LIST, RECEIVE_TASK, REMOVE_TASK } from '../actions/task_actions';


const AllTaskReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_TASK_LIST:
      const nextState = merge({}, oldState);
      action.taskList.forEach((task) => { nextState[task.id] = task; });
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

export default combineReducers({
  all: AllTaskReducer,
  assigned: AssignedTaskReducer
});
