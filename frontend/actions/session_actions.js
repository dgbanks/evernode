import * as SessionUtils from '../utils/session_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const authenticateUser = user => dispatch => (
  SessionUtils.authenticateUser(user)
    .then(user => dispatch(receiveUser(user)))
);