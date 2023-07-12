import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
interface CookieState {
  gCookie: string;
}
const cookies = new Cookies();
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

export const userCookie = (dispatch: Dispatch) => {
  const cookieValue = cookies.get("token");
  try {
    if (typeof cookieValue === "string" && cookieValue !== "") {
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
