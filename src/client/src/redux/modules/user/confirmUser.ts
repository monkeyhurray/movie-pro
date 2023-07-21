import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { UserActionTypes } from "../constants/actionTypes";
import { Cookies } from "react-cookie";
import { PURGE } from "redux-persist";

interface confirmUserState {
  loginStay: boolean;
}
const cookies = new Cookies();
const initialState: confirmUserState = {
  loginStay: false,
};

const confirmUserSlice = createSlice({
  name: "confirmUser",
  initialState,
  reducers: {
    setLoginStay: (state, action: PayloadAction<boolean>) => {
      state.loginStay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setLoginStay } = confirmUserSlice.actions;

export const logOut = (dispatch: Dispatch) => {
  cookies.remove("token");
  dispatch(setLoginStay(false));
  dispatch({
    type: UserActionTypes.DELETE_COOKIE,
  });
};

export const confirmUser =
  (data: confirmUserState) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/", data);
      dispatch({
        type: UserActionTypes.CONFIRM_USER,
        payload: response.data,
      });
      console.log("유저가 확인되었습니다.");
    } catch (error) {
      alert("로그인 오류가 발생하였습니다.");
      console.error("로그인 중 오류가 발생했습니다.", error);
    }
  };

export default confirmUserSlice.reducer;
