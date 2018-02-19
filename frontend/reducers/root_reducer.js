import { combineReducers } from 'redux';
import { EntitiesReducer } from './entities_reducer';
import { UIReducer } from './ui_reducer';

export default combineReducers({
  entities: EntitiesReducer,
  ui: UIReducer
});
