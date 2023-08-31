import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoInfo {
  fileUrlId: string;
  fileUrlIdNum: number;
  videoIdBox: (string | string[])[];
}

const initialState: videoInfo = {
  fileUrlId: "",
  fileUrlIdNum: 0,
  videoIdBox: [],
};

const videoInfoSlice = createSlice({
  name: "videoInfo",
  initialState,
  reducers: {
    setFileUrlId: (state, action: PayloadAction<string>) => {
      state.fileUrlId = action.payload;
    },
    setFileUrlIdNum: (state, action: PayloadAction<number>) => {
      state.fileUrlIdNum = action.payload;
    },
    setVideoIdBox: (state, action: PayloadAction<string | string[]>) => {
      return {
        ...state,
        videoIdBox: [...state.videoIdBox, action.payload],
      };
    },
  },
});

export const { setFileUrlId, setFileUrlIdNum, setVideoIdBox } =
  videoInfoSlice.actions;

export default videoInfoSlice.reducer;
