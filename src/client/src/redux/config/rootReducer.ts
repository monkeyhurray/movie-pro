import { combineReducers } from "@reduxjs/toolkit";
import signUpUserReducer from "../modules/user/signUpUser";
import logInUserReducer from "../modules/user/logInUser";
import confirmUserReducer from "../modules/user/confirmUser";
import videoContentReducer from "../modules/product/videoContent";
import userCookieReducer from "../modules/user/userCookie";

const rootReducer = combineReducers({
  user: signUpUserReducer,
  logInUser: logInUserReducer,
  confirmUser: confirmUserReducer,
  videoContent: videoContentReducer,
  userCookie: userCookieReducer,
});

export default rootReducer;
