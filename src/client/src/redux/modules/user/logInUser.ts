import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";
import axios from "axios";

interface LoginUserState {
  id: string;
  password: string;
}

const initialState: LoginUserState = {
  id: "",
  password: "",
};
export const logInUser = createAsyncThunk(
  UserActionTypes.LOGIN_USER,
  async (dataToSubmit: LoginUserState) => {
    const request = await axios
      .post("/login", dataToSubmit)
      .then((response) => response.data);
    return {
      type: UserActionTypes.LOGIN_USER,
      payload: request,
    };
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});

export const { setId, setPassword } = logInUserSlice.actions;

export default logInUserSlice.reducer;
