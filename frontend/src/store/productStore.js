import create from "zustand";

import { publicRequest, userRequest } from "../services/requestApi.js";

const productStore = create(
  set => ({
    products: [],
    isFetching: false,
    error: false,
    //GET ALL
    getProducts: async () => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await publicRequest.get("/products");
        set({ products: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    //DELETE
    deleteProduct: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.delete(`/products/${payload}`);
        set(state => {
          state.products = state.products.filter(p => p['_id'] !== data['_id']);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // UPDATE
    updateProduct: async (id, payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.put(`/products/${id}`, payload);
        set(state => {
          state.products = state.products.map(p => p['_id'] === id ? data : p);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // ADD
    addProduct: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/products`, payload);
        set(state => {
          state.products = [...state.products, data];
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    }
  }),
);

export default productStore;