import { RECEIVE_CANVAS_ERRORS} from '../actions/canvas_actions';
import { RECEIVE_NODE_ERRORS } from '../actions/node_actions';

export const ErrorsReducer = (prevState = [], action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_CANVAS_ERRORS:
      return action.errors;
    case RECEIVE_NODE_ERRORS:
      return action.errors;
    default:
      return prevState;
  }
};
