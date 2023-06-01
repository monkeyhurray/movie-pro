import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Action } from "redux";
import axios from "axios";

interface confirmUserState {
  loggedIn: boolean;
}
const initialState: confirmUserState = {
  loggedIn: false,
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedIn: (
      state,
      action: PayloadAction<confirmUserState["loggedIn"]>
    ) => {
      state.loggedIn = action.payload;
    },
  },
});
export const { setLoggedIn } = loggedInUserSlice.actions;

export const confirmUser =
  () => async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    try {
      const response = await axios.get("/");
      const isLoggedIn = response.data.loggedIn;

      dispatch(setLoggedIn(isLoggedIn));
    } catch (error) {
      alert("로그인 확인이 어렵습니다.");
    }
  };

export default loggedInUserSlice.reducer;
