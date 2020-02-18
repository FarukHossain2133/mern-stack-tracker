import {combineReducers} from 'redux';

import exerciseReducer from './exercise';
import userReducer from './exercise';

const store = combineReducers({
    exercises: exerciseReducer,
    user: userReducer
})

export default store;