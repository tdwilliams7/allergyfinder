import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { allergyReducer } from './allergyReducer';
import { reactionReducer } from './reactionReducer';

const rootReducer = combineReducers({
  userReducer,
  allergyReducer,
  reactionReducer
});

export default rootReducer;
