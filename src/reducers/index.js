import {combineReducers} from 'redux';
import UserDataReducer from './UserDataReducer';

const rootReducers =combineReducers({
    UserDataReducer:UserDataReducer,
});

export default rootReducers;
