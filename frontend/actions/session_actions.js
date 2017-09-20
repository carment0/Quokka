import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = (userInfo) => (dispatch) => (
  $.ajax({ method: 'POST', url: '/api/users', data: { user: userInfo } })
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    }, (err) => {
      dispatch(receiveErrors(err.responseJSON));
    })
);

export const login = (userInfo) => (dispatch) => (
  APIUtil.login(userInfo).then((user) => (
    dispatch(receiveCurrentUser(user))
  ), (err) => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => (dispatch) => (
  APIUtil.logout().then(() => (
    dispatch(receiveCurrentUser(null))
  ))
);
