// loginUserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/*
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";
import { UserActionTypes } from "../constants/actionTypes";
*/
export type MyActionType = { type: string; payload: string };

interface UserState {
  id: string;
  password: string;

  // 추가적인 유저 정보를 필요에 따라 포함시킬 수 있습니다.
}

const initialState: UserState = {
  id: "",
  password: "",
};

const logInUserSlice = createSlice({
  name: "logInUser",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    // 추가적인 유저 정보를 업데이트하는 리듀서를 정의할 수 있습니다.
  },
});

export const { setId, setPassword } = logInUserSlice.actions;
/**
export const logInUser =
  (
    dataToSubmit: UserState
  ): ThunkAction<Promise<void>, RootState, unknown, MyActionType> =>
  async (dispatch) => {
    try {
      const response = await axios.post("/login", dataToSubmit);
      dispatch({
        type: UserActionTypes.LOGIN_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error("로그인 중 오류 발생", error);
    }
  };
 */
export default logInUserSlice.reducer;
