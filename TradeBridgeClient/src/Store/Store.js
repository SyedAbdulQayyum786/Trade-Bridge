import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/LoginSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
