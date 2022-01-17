import { createSlice } from "@reduxjs/toolkit";

const userRedux = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailed, logout } = userRedux.actions;
export default userRedux.reducer;