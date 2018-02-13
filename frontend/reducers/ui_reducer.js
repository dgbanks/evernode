import { combineReducers } from 'redux';
import { SessionReducer } from './session_reducer';

export const UIReducer = combineReducers({
  session: SessionReducer
});