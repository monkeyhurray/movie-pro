// confirmUserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type MyActionType = { type: string; payload: boolean };

interface confirmUserState {
  member: boolean;
}

const initialState: confirmUserState = {
  member: false,
};

const confirmUserSlice = createSlice({
  name: "confirmUser",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<boolean>) => {
      state.member = action.payload;
    },
  },
});
export const { setMember } = confirmUserSlice.actions;

export const confirmUser =
  (): ThunkAction<Promise<void>, RootState, unknown, MyActionType> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const response = await axios.post("/");
      const isLoggedIn = response.data.loggedIn;

      dispatch(setMember(isLoggedIn));
    } catch (error) {
      alert("로그인 확인이 어렵습니다.");
    }
  };

export default confirmUserSlice.reducer;
