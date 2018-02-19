import {
  RECEIVE_CANVAS,
  RECEIVE_USER_CANVASES,
  REMOVE_CANVAS
} from '../actions/canvas_actions';

export const CanvasesReducer = (prevState = {}, action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_CANVAS:
      return Object.assign(
        {},
        prevState,
        { [action.canvas.data.id]: action.canvas.data }
      );
    case RECEIVE_USER_CANVASES:
      return action.canvases.data;
    case REMOVE_CANVAS:
      let newState = Object.assign({}, prevState);
      delete newState[action.canvas.data.id];
      return newState;
    default:
      return prevState;
  }
};
