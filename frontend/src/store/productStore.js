import create from "zustand";

import { publicRequest, userRequest } from "../requestApi.js";

export const productStore = create(
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
        // TODO REMOVE BDD
        set(state => {
          state.products.splice(state.products.findIndex(item => item['_id'] === payload), 1);
          state.isFetching = false;
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
          state.products[state.products.findIndex(item => item['_id'] === id)] = data;
          state.isFetching = false;
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
          state.products.push(data);
          state.isFetching = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    }
  }));

export default productStore;