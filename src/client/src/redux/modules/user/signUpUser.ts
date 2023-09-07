import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";
import axios from "axios";

interface UserState {
  id: string;
  email: string;
  name: string;
  userName: string;
  userThumb: File | null;
  password: string;
  password2: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  name: "",
  userName: "",
  userThumb: null,
  password: "",
  password2: "",
};

export const signUpConfirm = createAsyncThunk(
  UserActionTypes.SIGN_UP_USER,
  async (formData: FormData) => {
    const request = await axios
      .post("/signUp", formData)
      .then((response) => response.data);
    return {
      type: UserActionTypes.SIGN_UP_USER,
      payload: request,
    };
  }
);

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
    setUserThumb: (state, action: PayloadAction<File>) => {
      state.userThumb = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPassword2: (state, action: PayloadAction<string>) => {
      state.password2 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpConfirm.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});

export const {
  setId,
  setEmail,
  setName,
  setUserName,
  setUserThumb,
  setPassword,
  setPassword2,
} = signUpUserSlice.actions;

export default signUpUserSlice.reducer;
