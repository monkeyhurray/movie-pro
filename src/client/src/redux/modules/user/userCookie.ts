import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { getCookie } from "../../../cookie";
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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setGcookie } = userCookieSlice.actions;

export const userCookie = async (dispatch: Dispatch) => {
  const cookieValue = getCookie("myToken");
  try {
    if (cookieValue !== "" || cookieValue !== undefined) {
      dispatch(setGcookie(cookieValue));
      console.log("쿠키전송 성공");
    } else {
      dispatch(setGcookie(""));
      console.log("쿠키전송 삭제 성공");
    }
  } catch (error) {
    console.error("쿠키전송 실패", error);
  }
};

export default userCookieSlice.reducer;
