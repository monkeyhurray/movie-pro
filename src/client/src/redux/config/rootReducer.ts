import { combineReducers } from "@reduxjs/toolkit";
import signUpUserReducer from "../modules/user/signUpUser";
import loggedInUserReducer from "../modules/user/confirmUser";
import logInUserReducer from "../modules/user/logInUser";
const rootReducer = combineReducers({
  user: signUpUserReducer,
  loggedInUser: loggedInUserReducer,
  logInUser: logInUserReducer,
});

export default rootReducer;
