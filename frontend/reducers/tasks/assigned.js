import { RECEIVE_ASSIGNED_TASKS } from '../../actions/task_actions';

export default (oldState = [], action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ASSIGNED_TASKS:
      return action.tasks;

    default:
      return oldState;
  }
};
