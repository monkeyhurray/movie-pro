import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface videoContentState {
  title: string;
  thumb: File | null;
  fileContent: File | null;
}

const initialState: videoContentState = {
  title: "",
  thumb: null,
  fileContent: null,
};

const videoContentSlice = createSlice({
  name: "videoContent",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setThumb: (state, action: PayloadAction<File | null>) => {
      state.thumb = action.payload;
    },
    setFileContent: (state, action: PayloadAction<File>) => {
      state.fileContent = action.payload;
    },
  },
});
export const { setTitle, setThumb, setFileContent } = videoContentSlice.actions;

export default videoContentSlice.reducer;
