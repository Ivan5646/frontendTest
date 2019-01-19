import {combineReducers} from "redux";
import tasksReducer from "./tasksReducer";

const allReducers = combineReducers({ // that will be thrown to the Store
    tasks: tasksReducer
});

export default allReducers;