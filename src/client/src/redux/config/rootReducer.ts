import { combineReducers } from "@reduxjs/toolkit";
import signUpUserReducer from "../modules/user/signUpUser";
import logInUserReducer from "../modules/user/logInUser";
import confirmUserReducer from "../modules/user/confirmUser";
import userCookieReducer from "../modules/user/userCookie";
import videoUploadReducer from "../modules/product/videoUpload";
import videoPlayReducer from "../modules/product/videoPlay";
import videoOwnerReducer from "../modules/product/videoOwner";
import videoInfoReducer from "../modules/product/videoInfo";
import userThumbReducer from "../modules/user/userThumb";

const rootReducer = combineReducers({
  user: signUpUserReducer,
  logInUser: logInUserReducer,
  confirmUser: confirmUserReducer,
  videoUpload: videoUploadReducer,
  videoOwner: videoOwnerReducer,
  videoPlay: videoPlayReducer,
  userCookie: userCookieReducer,
  videoInfo: videoInfoReducer,
  userThumb: userThumbReducer,
});

export default rootReducer;
