import merge from 'lodash/merge';

import { RECEIVE_PROJECT_DETAIL } from '../../actions/project_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);

  const newState = {};
  switch (action.type) {
    case RECEIVE_PROJECT_DETAIL:
      newState[action.project.id] = action.project;
      return merge({}, oldState, newState);

    default:
      return oldState;
  }
};
