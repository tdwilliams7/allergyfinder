import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { allergyReducer } from './allergyReducer';

const rootReducer = combineReducers({ userReducer, allergyReducer });

export default rootReducer;
