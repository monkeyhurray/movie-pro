import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";
import axios from "axios";

interface videoBox {
  title: string;
  owner: string;
  video: string;
  genre: string;
  actors: string;
  introduce: string;
}

const initialState: videoBox = {
  title: "",
  owner: "",
  video: "",
  genre: "",
  actors: "",
  introduce: "",
};

export const videoControll = createAsyncThunk(
  UserActionTypes.VIDEO_PLAY,
  async (fileUrlId: string) => {
    try {
      const response = await axios.get(`/video/movie/${fileUrlId}`);
      return {
        type: UserActionTypes.VIDEO_PLAY,
        payload: response.data.video,
      };
    } catch (error) {
      throw new Error("영상 가져오기를 실패했습니다.");
    }
  }
);

const videoPlaySlice = createSlice({
  name: "videoPlay",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
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
    builder.addCase(videoControll.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});

export const {
  setTitle,
  setOwner,
  setVideo,
  setGenre,
  setActors,
  setIntroduce,
} = videoPlaySlice.actions;

export default videoPlaySlice.reducer;
