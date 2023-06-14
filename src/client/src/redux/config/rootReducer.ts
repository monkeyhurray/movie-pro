import { combineReducers } from "@reduxjs/toolkit";
import signUpUserReducer from "../modules/user/signUpUser";
import logInUserReducer from "../modules/user/logInUser";
import confirmUserReducer from "../modules/user/confirmUser";

const rootReducer = combineReducers({
  user: signUpUserReducer,
  logInUser: logInUserReducer,
  confirmUser: confirmUserReducer,
});

export default rootReducer;
