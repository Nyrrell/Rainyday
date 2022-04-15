import create from "zustand";

import { userRequest } from "../hooks/requestApi.js";

const OrderStore = create(
  set => ({
    userOrders: [],
    allOrders: [],
    isFetching: false,
    error: false,
    // CLIENT ORDER
    getUserOrder: async () => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.get(`/orders/find/`);
        set({ userOrders: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // ALL USER ORDER
    getAllOrders: async () => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post("/orders");
        set({ allOrders: data, isFetching: false });
      } catch {
        set({ isFetching: false, error: true });
      }
    },
    // UPDATE
    updateOrders: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.put(`/orders/${payload['_id']}`, payload);
        set(state => {
          state.allOrders = state.allOrders.map(o => o['_id'] === payload['_id'] ? data : o);
          state.isFetching = false;
          state.error = false;
        });
      } catch {
        set({ isFetching: false, error: true });
      }
    }
  })
);

export default OrderStore;