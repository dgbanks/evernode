import { RECEIVE_USER } from '../actions/user_actions';

const nullUser = {
  currentUser: null
};

export const SessionReducer = (prevState = nullUser, action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, prevState, {currentUser: action.user.data});
    default:
      return prevState;
  }
};
