import merge from 'lodash/merge';

import { RECEIVE_USERS_FROM_COMPANY } from '../actions/users_by_company_actions';

export default (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_USERS_FROM_COMPANY:
      newState = {};
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      return merge({}, oldState, newState);

    default:
      return oldState;
  }
};
