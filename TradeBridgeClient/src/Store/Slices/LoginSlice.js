import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
  name: "login",
  initialState: {
    login: false,
    user: {},
  },
  reducers: {
    userLogin(state, action) {
      state.login = true;
    },
    userLogout(state, action) {
      state.login = false;
      state.user = {};
    },
    logedinUser(state, action) {
      state.user = action.payload;
    },
  },
});
export default login.reducer;
export const { userLogin, userLogout, logedinUser } = login.actions;
