import {combineReducers} from "redux";
import tasksReducer from "./tasksReducer";
import loginReducer from "./loginReducer";

const allReducers = combineReducers({ // that will be thrown to the Store
    tasks: tasksReducer,
    login: loginReducer
});

export default allReducers;