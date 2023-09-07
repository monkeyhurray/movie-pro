import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";
import axios from "axios";

interface videoInfo {
  title: string;
  owner: string;
  video: string;
  genre: string;
  actors: string;
  introduce: string;
}

const initialState: videoInfo = {
  title: "",
  owner: "",
  video: "",
  genre: "",
  actors: "",
  introduce: "",
};

export const videoAppControll = createAsyncThunk(
  UserActionTypes.VIDEO_INFO,
  async (fileUrlId: string) => {
    try {
      const response = await fileUrlId;
      return {
        type: UserActionTypes.VIDEO_INFO,
        payload: response,
      };
    } catch (error) {
      throw new Error("영상 가져오기를 실패했습니다.");
    }
  }
);

const videoInfoSlice = createSlice({
  name: "videoInfo",
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(videoAppControll.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});

export const { setVideo } = videoInfoSlice.actions;

export default videoInfoSlice.reducer;
