import jwtDecode from "jwt-decode";
import create from "zustand";

import { publicRequest } from "../requestApi.js";

const authStore = create(
  (set, get) => ({
    token: '',
    isFetching: false,
    error: false,
    status: null,
    message: null,
    init: () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;
      const token = jwtDecode(storedToken)
      if (!token.exp * 1000 > Date.now()) return get().logout();

      set({ token: storedToken });
    },
    isAdmin : () => {
      const token = get().token;
      if (!token) return false;
      return jwtDecode(token)['isAdmin']
    },
    login: async (payload) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/login', payload);
        localStorage.setItem("token", data);
        set({ token: data });
        get().clearError();
      } catch (e) {
        set({
          isFetching: false,
          error: true,
          status: e['response']?.['status'],
          message: e['response']?.['data']['message']
        });
      }
    },
    register: async (payload) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/register', payload);
        localStorage.setItem("token", data);
        set({ token: data });
        get().clearError();
      } catch (e) {
        set({
          isFetching: false,
          error: true,
          status: e['response']?.['status'],
          message: e['response']?.['data']['message']
        });
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ token: '' });
    },
    clearError: () => set({ isFetching: false, error: false, status: null, message: null }),
  }),
);

authStore.getState().init();

export default authStore;