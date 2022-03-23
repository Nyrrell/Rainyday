import create from "zustand";

import { userRequest } from "../services/requestApi.js";

const CheckoutStore = create(
  set => ({
    orderId: '',
    isFetching: false,
    error: false,
    errorOrder: null,
    // CREATE
    createOrder: async (payload, actions) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/checkout/create`, payload);
        set({ orderId: data, isFetching: false, error: false });
        return actions.resolve();
      } catch (e) {
        set({ isFetching: false, error: true, errorOrder: e['response']?.['data']?.['notAvailable'] });
        return actions.reject()
      }
    },
    approveOrder: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        await userRequest.post(`/checkout/${payload}/capture`);
        set({ orderId: '', isFetching: false, error: false });
      } catch (e) {
        set({ isFetching: false, error: true });
      }
    },
    cancelOrder: async (payload) => {
      set({ isFetching: true, error: false });
      try {
        await userRequest.delete(`/checkout/${payload}/cancel`);
        set({ orderId: '', isFetching: false, error: false });
      } catch (e) {
        set({ isFetching: false, error: true });
      }
    }
  })
);

export default CheckoutStore;