import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { UserActionTypes } from "../constants/actionTypes";

interface CookieState {
  gCookie: string;
}

const initialState: CookieState = {
  gCookie: "",
};

const userCookieSlice = createSlice({
  name: "userCookie",
  initialState,
  reducers: {
    setGcookie: (state, action: PayloadAction<string>) => {
      state.gCookie = action.payload;
    },
  },
});

export const { setGcookie } = userCookieSlice.actions;

export const signUpUser =
  (cookieData: CookieState) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/login", cookieData);
      dispatch({
        type: UserActionTypes.USER_COOKIE_CONFRIM,
        payload: response.data,
      });
      console.log("쿠키 전송 완료");
    } catch (error) {
      alert("쿠키전송 실패");
      console.error("쿠키전송 실패", error);
    }
  };

export default userCookieSlice.reducer;
