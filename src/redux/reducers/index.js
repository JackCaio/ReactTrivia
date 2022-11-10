import { combineReducers } from 'redux';
import player from './player';
import timerReducer from './timer';

const rootReducer = combineReducers({ player, timerReducer });

export default rootReducer;
