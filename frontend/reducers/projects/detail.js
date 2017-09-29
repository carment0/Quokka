import merge from 'lodash/merge';

import { RECEIVE_PROJECT_DETAIL, REMOVE_PROJECT } from '../../actions/project_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
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
