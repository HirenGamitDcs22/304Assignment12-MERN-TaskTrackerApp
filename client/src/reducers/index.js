import { combineReducers } from "redux";
import loggedReducer from "./isLogged";
import taskReducer from "./tasks"
import userReducer from "./user";

const allReducers = combineReducers({
    isLogged:loggedReducer,
    tasks:taskReducer,
    user:userReducer
})
export default allReducers
