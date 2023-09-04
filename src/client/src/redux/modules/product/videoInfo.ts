import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoInfo {
  videoInfo: string[];
}

const initialState: videoInfo = {
  videoInfo: [],
};

const videoInfoSlice = createSlice({
  name: "videoInfo",
  initialState,
  reducers: {
    setVideoInfo: (state, action: PayloadAction<string[]>) => {
      state.videoInfo = [...state.videoInfo, ...action.payload];
    },
  },
});

export const { setVideoInfo } = videoInfoSlice.actions;

export default videoInfoSlice.reducer;
