import create from "zustand";

import { userRequest } from "../services/requestApi.js";

const userStore = create(
  set => ({
    users: [],
    isFetching: false,
    error: false,
    //GET ALL
    getUsers: async () => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.get("/users");
        set({ users: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    //DELETE
    deleteUser: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        // TODO REMOVE BDD
        set(state => {
          state.users = state.users.filter(p => p['_id'] !== payload);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // UPDATE
    updateUser: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.put(`/users/${payload['_id']}`, payload);
        set(state => {
          state.users = state.users.map(p => p['_id'] === payload['_id'] ? data : p);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    }
  })
);

export default userStore;