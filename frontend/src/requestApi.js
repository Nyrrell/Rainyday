import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzM4ZjBiNDhjYzlhMzZhOGQ3N2FkZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDg4NDY3NCwiZXhwIjoxNjQxMTQzODc0fQ.CA6HtF8bXEuCINu2wOkHOiIBITHVZaeLT1iFJdo6vR8"; //TODO

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
});