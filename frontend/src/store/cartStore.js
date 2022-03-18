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
      const { _id, quantity, price } = payload;
      state.quantity += quantity;
      state.total += price * quantity;
      const exist = findInCart(state, _id);
      if (exist) exist.quantity += quantity;
      else state.products.push({ _id, quantity });
    }),
    removeProduct: (payload) => set(state => {
      const { _id, quantity, price } = payload;
      state.quantity -= quantity;
      state.total -= price * quantity;
      state.products = state.products.filter((item) => item['_id'] !== _id);
    }),
    updateProduct: (payload) => set(state => {
      const { _id, quantity, price } = payload;
      const productCart = findInCart(state, _id);
      if (quantity > productCart['quantity']) {
        const newQuantity = quantity - productCart['quantity'];
        productCart['quantity'] += newQuantity;
        state.quantity += newQuantity;
        state.total += newQuantity * price;
      } else if (quantity < productCart['quantity']) {
        const newQuantity = productCart['quantity'] - quantity;
        productCart['quantity'] -= newQuantity;
        state.quantity -= newQuantity;
        state.total -= newQuantity * price;
      }
    }),
    emptyProduct: () => set({ ...initalState })
  }),
  {
    name: 'cart'
  }
));

export default cartStore