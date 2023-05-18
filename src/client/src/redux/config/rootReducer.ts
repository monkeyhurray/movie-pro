import { combineReducers } from "@reduxjs/toolkit";
import signUpUserReducer from "../modules/user/signUpUser";

const rootReducer = combineReducers({
  user: signUpUserReducer,
  // 다른 모듈의 리듀서들을 추가로 포함시킬 수 있습니다.
});

export default rootReducer;
