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
      const { data } = await publicRequest.post('/auth/login', payload)
        .catch(() => set({ isFetching: false, error: true }));
      set({ currentUser: data, isFetching: false });
    },
    logout: () => {
      set({ currentUser: null });
    },
  }),
  {
    name: 'user',
    partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => ["currentUser"].includes(key))),
  }
));

export default userStore;