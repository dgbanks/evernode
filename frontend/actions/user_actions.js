import * as AuthUtils from '../utils/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const removeUser = () => ({
  type: REMOVE_USER
});

export const authenticateUser = user => dispatch => (
  AuthUtils.authenticateUser(user)
    .then(authenticatedUser => dispatch(receiveUser(authenticatedUser)))
);

export const logout = () => dispatch => (
  AuthUtils.destroySession().then(() => dispatch(removeUser()))
);
