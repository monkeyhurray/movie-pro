import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { UserActionTypes } from "../constants/actionTypes";

interface UserState {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  name: "",
  userName: "",
  password: "",
  password2: "",
};

const signUpUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPassword2: (state, action: PayloadAction<string>) => {
      state.password2 = action.payload;
    },
  },
});
export const {
  setId,
  setEmail,
  setName,
  setUserName,
  setPassword,
  setPassword2,
} = signUpUserSlice.actions;

export const signUpUser =
  (dataToSubmit: UserState) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const response = await axios.post("/signUp", dataToSubmit);
      dispatch({
        type: UserActionTypes.SIGN_UP_USER,
        payload: response.data,
      });
      console.log("회원가입이 성공적으로 처리되었습니다.");
    } catch (error) {
      alert("가입 오류가 발생하였습니다.");
      console.error("회원가입 중 오류가 발생했습니다.", error);
    }
  };

export default signUpUserSlice.reducer;
