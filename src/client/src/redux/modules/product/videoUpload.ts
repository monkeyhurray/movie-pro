import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";

import axios from "axios";
interface videoUploadState {
  title: string;
  videoFile: File | null;
  owner: string;
  genre: string;
  actors: string;
  introduce: string;
}

const initialState: videoUploadState = {
  title: "",
  videoFile: null,
  owner: "",
  genre: "",
  actors: "",
  introduce: "",
};

export const videoUpload = createAsyncThunk(
  UserActionTypes.VIDEO_UPLOAD,
  async (dataToSubmit: FormData) => {
    const request = await axios.post("/video/upload", dataToSubmit);

    return {
      type: UserActionTypes.VIDEO_UPLOAD,
      payload: request,
    };
  }
);

const videoUploadSlice = createSlice({
  name: "videoUpload",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setVideoFile: (state, action: PayloadAction<File>) => {
      state.videoFile = action.payload;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setActors: (state, action: PayloadAction<string>) => {
      state.actors = action.payload;
    },
    setIntroduce: (state, action: PayloadAction<string>) => {
      state.introduce = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(videoUpload.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});
export const {
  setTitle,
  setVideoFile,
  setOwner,
  setGenre,
  setActors,
  setIntroduce,
} = videoUploadSlice.actions;

export default videoUploadSlice.reducer;
