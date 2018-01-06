export const RECEIVE_USERS_FROM_COMPANY = 'RECEIVE_USERS_FROM_COMPANY';
export const receiveUsersFromCompany = (users) => ({
  type: RECEIVE_USERS_FROM_COMPANY,
  users
});

export const fetchUsersFromCompany = (companyName) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/users/by_company?company=${companyName}` })
    .then((users) => (
      dispatch(receiveUsersFromCompany(users))
    ))
);
