import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../constants/actionTypes";
export * from "./signUpUser";
export { default as signUpUserReducer } from "./signUpUser";
export function signUpUser(dataToSubmit) {
  return {
    type: REGISTER_USER,
    payload: dataToSubmit,
  };
}
const initialState = {};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      // LOGIN_USER 액션 처리
      return state;
    case REGISTER_USER:
      // REGISTER_USER 액션 처리
      return state;
    case AUTH_USER:
      // AUTH_USER 액션 처리
      return state;
    default:
      return state;
  }
}
