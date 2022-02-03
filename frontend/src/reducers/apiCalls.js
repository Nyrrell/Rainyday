import { publicRequest, userRequest } from "../requestApi.js";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productReducer.js";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const { data } = await publicRequest.get("/products");
    dispatch(getProductSuccess(data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // TODO delete
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const { data } = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, data }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const { data } = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};