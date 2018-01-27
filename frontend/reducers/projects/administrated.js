import merge from 'lodash/merge';

import { RECEIVE_ADMINISTRATED_PROJECTS, REMOVE_PROJECT } from '../../actions/project_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_ADMINISTRATED_PROJECTS:
      newState = {};
      action.projects.forEach((project) => {
        newState[project.id] = project;
        let count = 0;
        project.tasks.forEach((task) => {
          if (task.completed) {
            count += 1;
          }
        });
        if (count === Object.keys(project.tasks).length && count !== 0) {
          project.completed = true;
        } else {
          project.completed = false;
        }
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
