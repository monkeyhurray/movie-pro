import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";

import axios from "axios";

interface videoOwnerState {
  videoId: string;
  videoUrl: string;
}

const initialState: videoOwnerState = {
  videoId: "",
  videoUrl: "",
};

export const videoOwner = createAsyncThunk(
  UserActionTypes.VIDEO_OWNER,
  async () => {
    const request = await axios.get("/");

    return {
      type: UserActionTypes.VIDEO_OWNER,
      payload: request,
    };
  }
);

const videoOwnerSlice = createSlice({
  name: "videoOwner",
  initialState,
  reducers: {
    setVideoOwner: (state, action: PayloadAction<string>) => {
      state.videoId = action.payload;
    },
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(videoOwner.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});
export const { setVideoOwner, setVideoUrl } = videoOwnerSlice.actions;

export default videoOwnerSlice.reducer;
