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

/**
 * @param {object} user User should have username and password as key
 * @example
 * const user = {
 *   username: 'hellokitty',
 *   password: 'fatcat'
 * }
 * @return {Promise}
 */
export const signup = (user) => (dispatch) => (
  $.ajax({ method: 'POST', url: '/api/users', data: { user } })
    .then((currentUser) => (
      dispatch(receiveCurrentUser(currentUser))
    ))
    .fail((err) => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

/**
 * @param {object} user User should have username and password as key
 * @example
 * const user = {
 *   username: 'hellokitty',
 *   password: 'fatcat'
 * }
 * @return {Promise}
 */
export const login = (user) => (dispatch) => (
  $.ajax({ method: 'POST', url: '/api/session', data: { user } })
    .then((currentUser) => (
      dispatch(receiveCurrentUser(currentUser))
    ))
    .fail((err) => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

/**
 * @return {Promise}
 */
export const logout = () => (dispatch) => (
  $.ajax({ method: 'DELETE', url: '/api/session' })
    .then(() => (
      dispatch(receiveCurrentUser(null))
    ))
);
