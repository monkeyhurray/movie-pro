import { combineReducers } from "@reduxjs/toolkit";
import signUpUserReducer from "../modules/user/signUpUser";
import loggedInUserReducer from "../modules/user/confirmUser";
import logInUserReducer from "../modules/user/logInUser";
const rootReducer = combineReducers({
  user: signUpUserReducer,
  loggedInUser: loggedInUserReducer,
  logInUser: logInUserReducer,
  // 다른 모듈의 리듀서들을 추가로 포함시킬 수 있습니다.
});

export default rootReducer;
