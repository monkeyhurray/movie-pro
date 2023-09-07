import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";
import axios from "axios";

interface Thumb {
  userThumb: string;
}

const initialState: Thumb = {
  userThumb: "",
};

export const userThumb = createAsyncThunk(
  UserActionTypes.USER_THUMB,
  async (userThumb: string) => {
    try {
      const response = await userThumb;
      return {
        type: UserActionTypes.USER_THUMB,
        payload: response,
      };
    } catch (error) {
      throw new Error("영상 가져오기를 실패했습니다.");
    }
  }
);

const userThumbSlice = createSlice({
  name: "userThumb",
  initialState,
  reducers: {
    setUserThumb: (state, action: PayloadAction<string>) => {
      state.userThumb = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userThumb.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});

export const { setUserThumb } = userThumbSlice.actions;

export default userThumbSlice.reducer;
