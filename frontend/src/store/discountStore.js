import create from "zustand";

import { publicRequest, userRequest } from "../hooks/requestApi.js";

const DiscountStore = create(
  set => ({
    discountCart: null,
    discountCodes: [],
    isFetching: false,
    error: false,
    checkDiscountCode: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await publicRequest.get(`/discounts/find/${payload}`);
        set({ discountCart: { code: payload, ...data }, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    getDiscountCodes: async () => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await publicRequest.get("/discounts");
        set({ discountCodes: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    //DELETE
    deleteDiscountCode: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.delete(`/discounts/${payload}`);
        set(state => {
          state.discountCodes = state.discountCodes.filter(c => c['_id'] !== data['_id']);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // UPDATE
    updateDiscountCode: async (id, payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.put(`/discounts/${id}`, payload);
        set(state => {
          state.discountCodes = state.discountCodes.map(c => c['_id'] === id ? data : c);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // ADD
    addDiscountCode: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/discounts`, payload);
        set(state => {
          state.discountCodes = [...state.discountCodes, data];
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    }
  })
);

export default DiscountStore;