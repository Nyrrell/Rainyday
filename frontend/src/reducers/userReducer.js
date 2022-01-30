// import { createSlice } from "@reduxjs/toolkit";
//
// const userReducer = createSlice({
//   name: "user",
//   initialState: {
//     currentUser: null,
//     isFetching: false,
//     error: false
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.isFetching = true;
//     },
//     loginSuccess: (state, action) => {
//       state.isFetching = false;
//       state.currentUser = action.payload;
//     },
//     loginFailed: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//     }
//   }
// });
//
// export const { loginStart, loginSuccess, loginFailed, logout } = userReducer.actions;
// export default userReducer.reducer;

import create from "zustand";
import { persist } from "zustand/middleware"
import { publicRequest } from "../requestApi.js";

const userReducer = create(
  set => ({
    currentUser: null,
    isFetching: false,
    error: false,
    login: async (payload) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/login', payload);
        localStorage.setItem("token", JSON.stringify(data['accessToken']));
        set({ currentUser: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ currentUser: null });
    },
  }));

export default userReducer;