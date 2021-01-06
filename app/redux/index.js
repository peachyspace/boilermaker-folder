import { combineReducers } from "redux";

import userReducer from "./user";

//add  subreducers here
const appReducer = combineReducers({
  user: userReducer,
});

export default appReducer;
