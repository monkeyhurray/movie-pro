import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
  password2: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  name: "",
  username: "",
  password: "",
  password2: "",
};

const signUpUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPassword2: (state, action: PayloadAction<string>) => {
      state.password2 = action.payload;
    },
  },
});

export const {
  setId,
  setEmail,
  setName,
  setUsername,
  setPassword,
  setPassword2,
} = signUpUserSlice.actions;

export default signUpUserSlice.reducer;
