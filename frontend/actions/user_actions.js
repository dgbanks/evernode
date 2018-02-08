import * as UserUtils from '../utils/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

// export const loginUser = () => dispatch => (
//   UserUtils.getAPI()
// );

export const authenticateUser = user => dispatch => {
  console.log('INSIDE THE AUTHUSER ACTION');
  return UserUtils.authenticateUser(user)
    .then(authenticatedUser => dispatch(receiveUser(authenticatedUser)));
};
