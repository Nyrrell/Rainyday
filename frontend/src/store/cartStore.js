import { persist } from "zustand/middleware";
import create from "zustand";

const findInCart = (state, productId) => state.products.find(item => item['_id'] === productId);

const initalState = {
  products: [],
  quantity: 0,
  total: 0
};

const cartStore = create(persist(
  set => ({
    ...initalState,
    addProduct: (payload) => set(state => {
      state.quantity += payload['quantity'];
      state.total += payload.price * payload['quantity'];
      const exist = findInCart(state, payload['_id']);
      if (exist) exist.quantity += payload['quantity'];
      else state.products.push(payload);
    }),
    removeProduct: (payload) => set(state => {
      state.quantity -= payload['quantity'];
      state.total -= payload['price'] * payload['quantity'];
      state.products = state.products.filter((item) => item['_id'] !== payload['_id']);
    }),
    updateProduct: (payload) => set(state => {
      const product = findInCart(state, payload['_id']);
      if (payload['quantity'] > product['quantity']) {
        const newQuantity = payload['quantity'] - product['quantity'];
        product['quantity'] += newQuantity;
        state.quantity += newQuantity;
        state.total += newQuantity * product['price'];
      } else if (payload['quantity'] < product['quantity']) {
        const newQuantity = product['quantity'] - payload['quantity'];
        product['quantity'] -= newQuantity;
        state.quantity -= newQuantity;
        state.total -= newQuantity * product['price'];
      }
    }),
    emptyProduct: () => set({ ...initalState })
  }),
  {
    name: 'cart'
  }
));

export default cartStore