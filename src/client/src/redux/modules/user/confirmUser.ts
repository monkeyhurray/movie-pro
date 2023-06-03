import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { ThunkAction } from "@reduxjs/toolkit";

type MyActionType = { type: string; payload: boolean };

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
  (): ThunkAction<Promise<void>, RootState, unknown, MyActionType> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const response = await axios.get("/");
      const isLoggedIn = response.data.loggedIn;

      dispatch(setLoggedIn(isLoggedIn));
    } catch (error) {
      alert("로그인 확인이 어렵습니다.");
    }
  };

export default loggedInUserSlice.reducer;
