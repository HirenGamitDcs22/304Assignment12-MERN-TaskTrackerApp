import { combineReducers } from "redux";
import loggedReducer from "./isLogged";
import taskReducer from "./tasks"

const allReducers = combineReducers({
    isLogged:loggedReducer,
    tasks:taskReducer
})
export default allReducers
