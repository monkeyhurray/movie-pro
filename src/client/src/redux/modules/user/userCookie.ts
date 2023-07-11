import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

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

export const userCookie = (dispatch: Dispatch) => {
  try {
    const token = document.cookie;
    if (typeof token === "string" && token !== "") {
      console.log(token);
      dispatch(setGcookie(token));
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
