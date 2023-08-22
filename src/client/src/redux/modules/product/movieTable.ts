import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserActionTypes } from "../constants/actionTypes";

import axios from "axios";

interface TableBox {
  table: [];
}

const initialState: TableBox = {
  table: [],
};

export const tableControll = createAsyncThunk(
  UserActionTypes.MOVIE_TABLE,
  async (fileUrlId: string) => {
    try {
      const response = await axios.get(`/video/movie/${fileUrlId}`);
      return {
        type: UserActionTypes.MOVIE_TABLE,
        payload: response.data.video,
      };
    } catch (error) {
      throw new Error("영상 가져오기를 실패했습니다.");
    }
  }
);

const movieTableSlice = createSlice({
  name: "movieTable",
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<[]>) => {
      state.table = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tableControll.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
  },
});

export const { setTable } = movieTableSlice.actions;

export default movieTableSlice.reducer;
