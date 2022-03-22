import create from "zustand";

import { userRequest } from "../services/requestApi.js";

const CheckoutStore = create(
  set => ({
    orderId: null,
    isFetching: false,
    error: false,
    errorOrder: null,
    // CREATE
    createOrder: async (payload, actions) => {
      set({ isFetching: true, error: false });
      try {
        const { data } = await userRequest.post(`/checkout/create`, payload);
        set({ newOrder: data, isFetching: false, error: false });
        // return data;
        return actions.resolve(data);
      } catch (e) {
        set({ isFetching: false, error: true, errorOrder: e['response']?.['data']?.['notAvailable'] });
        return actions.reject()
      }
    }
  })
);

export default CheckoutStore;