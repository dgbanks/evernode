import {
    RECEIVE_LINK,
    RECEIVE_NODE_LINKS,
    REMOVE_LINK
} from '../actions/link_actions';

export const LinksReducer = (prevState = {}, action) => {
  Object.freeze(prevState);
  switch (action.type) {
    case RECEIVE_LINK:
      return Object.assign({}, prevState, { [action.link.data.id]: action.link.data });
    case RECEIVE_NODE_LINKS:
      return action.links.data;
    case REMOVE_LINK:
      let newState = Object.assign({}, prevState);
      delete newState[action.link.data.id];
      return newState;
    default:
      return prevState;
  }
};
