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

export const userCookie = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("/");
    const token = response.data.token;
    if (token) {
      dispatch(setGcookie(token));
      console.log("쿠키전송 성공");
    }
  } catch (error) {
    console.error("쿠키전송 실패", error);
  }
};

export default userCookieSlice.reducer;
