import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import reducer from "./reducers";
import {loadState } from "./persistState/localStorage";

const persistedState = loadState();
export default createStore(
    reducer,
    persistedState,
    applyMiddleware(thunk, logger)
)