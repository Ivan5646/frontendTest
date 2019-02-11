import {combineReducers} from "redux";
import tasksReducer from "./tasksReducer";
import loginReducer from "./loginReducer";
import fetchArgsReducer from "./fetchArgsReducer"

const allReducers = combineReducers({
    tasks: tasksReducer,
    login: loginReducer,
    fetchArgs: fetchArgsReducer
});

export default allReducers;