import { createSlice } from "@reduxjs/toolkit";

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
      const exist = state.products.findIndex(item => item['_id'] === action['payload']['_id']);
      if (exist === -1) {
      state.products.push(action.payload);
      } else {
        state.products[exist].quantity += action.payload.quantity
      }
    },
    removeProduct: (state, action) => {
      state.quantity -= action['payload']['quantity'];
      state.total -= action['payload']['price'] * action['payload']['quantity'];
      state.products.splice(
        state.products.findIndex((item) => item['_id'] === action['payload']['_id']),
        1
      );
    },
    updateProduct: (state, action) => {
      state.quantity += action.payload.product.quantity;
      state.total += action.payload.product.price * action.payload.product.quantity;
      state.products.splice(
        state.products.findIndex((item, key) => key === action['payload']['key']),
        1
      );
    },
    emptyCart: (state) => {
      state.quantity = 0;
      state.total = 0;
      state.products = [];
    }
  }
});

export const { addProduct, removeProduct, updateProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;