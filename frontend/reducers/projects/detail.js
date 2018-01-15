import merge from 'lodash/merge';

import { RECEIVE_PROJECT_DETAIL, REMOVE_PROJECT } from '../../actions/project_actions';
import { RECEIVE_TASK, REMOVE_TASK } from '../../actions/task_http_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;
  let project;

  switch (action.type) {
    case RECEIVE_TASK:
      newState = {};
      project = oldState[action.task.project_id];

      // Updating task
      action.task.assignees = [];

      let taskFound = false;
      for (let i = 0; i < project.tasks.length; i += 1) {
        if (project.tasks[i].id === action.task.id) {
          project.tasks[i] = action.task;
          taskFound = true;
        }
      }

      if (!taskFound) {
        project.tasks.push(action.task);
      }

      newState[project.id] = project;
      return merge({}, oldState, newState);

    case REMOVE_TASK:
      newState = {};
      project = oldState[action.task.project_id];
      const idx = project.tasks.map((task) => task.id).indexOf(action.task.id);
      project.tasks.splice(idx, 1);
      newState[project.id] = project;
      return merge({}, oldState, newState);

    case RECEIVE_PROJECT_DETAIL:
      newState = {};
      newState[action.project.id] = action.project;
      return merge({}, oldState, newState);

    case REMOVE_PROJECT:
      newState = merge({}, oldState);
      delete newState[action.project.id];
      return newState;

    default:
      return oldState;
  }
};
