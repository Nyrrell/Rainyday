import axios from 'axios';
import authStore from "../store/authStore.js";

const BASE_URL = process.env.REACT_APP_BACKEND_URL + 'api/';

const publicRequest = axios.create({
  baseURL: BASE_URL
});

const userRequest = axios.create({ baseURL: BASE_URL });
userRequest.interceptors.request.use((request) => {
  request.headers['common']['Authorization'] = `Bearer ${authStore.getState().token}`
  return request
});

export { publicRequest, userRequest };