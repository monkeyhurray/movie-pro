// loginUserSlice.ts
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";
import axios from "axios";

interface LoginUserState {
  id: string;
  password: string;
  // 추가적인 유저 정보를 필요에 따라 포함시킬 수 있습니다.
}

const initialState: LoginUserState = {
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

export const logInUser =
  (dataToSubmit: LoginUserState) => async (dispatch: Dispatch) => {
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

export default logInUserSlice.reducer;
