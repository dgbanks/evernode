import { combineReducers } from 'redux';
import { SessionReducer } from './session_reducer';
import { ErrorsReducer } from './errors_reducer';

export const UIReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorsReducer
});
