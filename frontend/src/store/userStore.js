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
          state.users.splice(state.users.findIndex(item => item['_id'] === payload), 1);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // UPDATE
    updateUser: async (id, payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.put(`/users/${id}`, payload);
        set(state => {
          state.users[state.users.findIndex(item => item['_id'] === id)] = data;
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // ADD
    addUser: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/users`, payload);
        set(state => {
          state.users.push(data);
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