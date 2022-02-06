import { persist } from "zustand/middleware";
import create from "zustand";

import { publicRequest } from "../requestApi.js";

const userStore = create(persist(
  set => ({
    currentUser: null,
    isFetching: false,
    error: false,
    login: async (payload) => {
      set({ isFetching: true });
      try {
        const { data } = await publicRequest.post('/auth/login', payload);
        set({ currentUser: data, isFetching: false, error: false });
      } catch (e) {
        set({ isFetching: false, error: true });
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

export default userStore;