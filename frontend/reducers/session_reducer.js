import { RECEIVE_USER, REMOVE_USER } from '../actions/session_actions';

const nullUser = {
  currentUser: null
};

export const SessionReducer = (prevState = nullUser, action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, prevState, {currentUser: action.user.data});
    case REMOVE_USER:
      return Object.assign({}, prevState, {currentUser: null});
    default:
      return prevState;
  }
};
