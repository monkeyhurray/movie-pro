import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./config/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
