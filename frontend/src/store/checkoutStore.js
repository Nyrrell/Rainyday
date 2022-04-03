import create from "zustand";

import { userRequest } from "../hooks/requestApi.js";

const CheckoutStore = create(
  set => ({
    orderId: '',
    error: false,
    isFetching: false,
    notAvailable: null,
    // CREATE
    createOrder: async (payload, actions) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/checkout/create`, payload);
        set({ orderId: data, isFetching: false, error: false });
        return actions.resolve();
      } catch (e) {
        set({ isFetching: false, error: true, notAvailable: e['response']?.['data']?.['notAvailable'] });
        return actions.reject()
      }
    },
    approveOrder: async (payload, actions) => {
      set({ isFetching: true, error: false });
      try {
        await userRequest.post(`/checkout/${payload}/capture`);
        set({ orderId: '', isFetching: false, error: false });
        return true;
      } catch (e) {
        set({ isFetching: false, error: true });
        if (e['response']?.['data']?.['message'] === 'INSTRUMENT_DECLINED') return actions.restart();
        return false;
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