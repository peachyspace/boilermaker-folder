import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import appReducer from "./redux";
import thunkMiddleware from "redux-thunk";
//import { createLogger } from "redux-logger";

const store = createStore(
  appReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
