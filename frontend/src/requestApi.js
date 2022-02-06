import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const user = JSON.parse(localStorage.getItem("user"))?.['state'];
const TOKEN = user && user['currentUser']?.['accessToken'];

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` }
});