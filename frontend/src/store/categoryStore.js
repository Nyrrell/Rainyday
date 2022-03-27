import create from "zustand";

import { publicRequest, userRequest } from "../services/requestApi.js";

const categoryStore = create(
  set => ({
    categories: [],
    isFetching: false,
    error: false,
    getCategories: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = payload === "public"
          ? await publicRequest.get('/categories?public=true')
          : await userRequest.post('/categories');
        set({ categories: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    //DELETE
    deleteCategory: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.delete(`/categories/${payload}`);
        set(state => {
          state.categories = state.categories.filter(c => c['_id'] !== data['_id']);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // UPDATE
    updateCategory: async (id, payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.put(`/categories/${id}`, payload);
        set(state => {
          state.categories = state.categories.map(c => c['_id'] === id ? data : c);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // ADD
    addCategory: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/categories/new`, payload);
        set(state => {
          state.categories = [...state.categories, data];
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    }
  })
);

export default categoryStore;