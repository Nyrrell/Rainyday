import { createSlice } from "@reduxjs/toolkit";

const findInCart = (state, productId) => state.products.find(item => item['_id'] === productId);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
      const exist = findInCart(state, action['payload']['_id']);
      if (exist) exist.quantity += action.payload.quantity;
      else state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.quantity -= action['payload']['quantity'];
      state.total -= action['payload']['price'] * action['payload']['quantity'];
      state.products.splice(
        state.products.findIndex((item) => item['_id'] === action['payload']['_id']),
        1
      );
      // MAYBE RENVOYER LE NOUVEAU STATE EN PLUS ?
    },
    updateProduct: (state, action) => {
      const product = findInCart(state, action['payload']['_id']);
      const newQuantity = action['payload']['quantity'];
      console.log(newQuantity)
      console.log(newQuantity < product['quantity'])
      if (newQuantity > product['quantity']) {
        product['quantity'] += newQuantity - product['quantity'];
        state.quantity += newQuantity - product['quantity'];
        state.total += (newQuantity - product['quantity']) * product['price']
      } else if (newQuantity < product['quantity']) {
        product['quantity'] -= product['quantity'] - newQuantity;
        state.quantity -= product['quantity'] - newQuantity;
        state.total -= (product['quantity']- newQuantity) * product['price']
      }
    },
    emptyProduct: (state) => {
      state.quantity = 0;
      state.total = 0;
      state.products = [];
    }
  }
});

export const { addProduct, removeProduct, updateProduct, emptyProduct } = cartSlice.actions;
export default cartSlice.reducer;