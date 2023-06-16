// confirmUserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface confirmUserState {
  member: boolean;
}

const initialState: confirmUserState = {
  member: false,
};

const confirmUserSlice = createSlice({
  name: "confirmUser",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<boolean>) => {
      state.member = action.payload;
    },
  },
});
export const { setMember } = confirmUserSlice.actions;

export default confirmUserSlice.reducer;
