import { persist } from "zustand/middleware";
import create from "zustand";

import { publicRequest } from "../requestApi.js";

const authStore = create(persist(
  set => ({
    currentUser: null,
    isFetching: false,
    error: false,
    statusCode: null,
    login: async (payload) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/login', payload);
        set({ currentUser: data, isFetching: false, error: false });
      } catch (e) {
        set({ isFetching: false, error: true });
      }
    },
    register: async (payload) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/register', payload);
        set({ currentUser: data, isFetching: false, error: false, statusCode: null });
      } catch (e) {
        set({ isFetching: false, error: true, statusCode: e['response']?.['status'] });
      }
    },
    logout: () => {
      set({ currentUser: null });
    },
  }),
  {
    name: 'user',
    partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => ["currentUser"].includes(key)))
  }
));

export default authStore;