import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

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
    if (typeof token === "string" && token !== "") {
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
export const selectUserCookie = (state: RootState) => state.userCookie.gCookie;

export default userCookieSlice.reducer;
