import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import tasksReducer from "./tasks/tasks-reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    tasks: tasksReducer
})

export default persistReducer(persistConfig, rootReducer);