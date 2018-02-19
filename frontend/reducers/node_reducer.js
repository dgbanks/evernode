import {
  RECEIVE_NODE,
  RECEIVE_CANVAS_NODES,
  REMOVE_NODE
} from '../actions/node_actions';

export const NodesReducer = (prevState = {}, action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_NODE:
      return Object.assign({}, prevState, { [action.node.data.id]: action.node.data });
    case RECEIVE_CANVAS_NODES:
      return action.nodes.data;
    case REMOVE_NODE:
      let newState = Object.assign({}, prevState);
      delete newState[action.node.data.id];
      return newState;
    default:
      return prevState;
  }
};
