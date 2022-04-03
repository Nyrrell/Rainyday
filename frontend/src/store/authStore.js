import jwtDecode from "jwt-decode";
import create from "zustand";

import { publicRequest, userRequest } from "../hooks/requestApi.js";

const authStore = create(
  (set, get) => ({
    token: '',
    username: '',
    error: false,
    status: null,
    message: null,
    isFetching: false,
    init: () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { username, exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) return get().logout();
      set({ token, username });
    },
    authorize: async () => {
      try {
        const { data } = await userRequest.post('/auth/authorize');
        return data['allowAccess'];
      } catch (e) {
        return false;
      }
    },
    login: async (payload, callback) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/login', payload);
        localStorage.setItem("token", data);
        set({ token: data, username: jwtDecode(data)['username'] });
        get().clearError();
        callback();
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
        set({ token: data, username: jwtDecode(data)['username'] });
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
      set({ token: '', username: '' });
    },
    clearError: () => set({ isFetching: false, error: false, status: null, message: null }),
  }),
);

authStore.getState().init();

export default authStore;