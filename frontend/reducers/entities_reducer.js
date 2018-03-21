import { combineReducers } from 'redux';
import { CanvasesReducer } from './canvas_reducer';
import { NodesReducer } from './node_reducer';
import { LinksReducer } from './link_reducer';

export const EntitiesReducer = combineReducers({
  canvases: CanvasesReducer
});
