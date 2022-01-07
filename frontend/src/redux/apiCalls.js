import { loginFailed, loginStart, loginSuccess } from "./userRedux.js";
import { publicRequest } from "../requestApi.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(data));
  } catch (e) {
    dispatch(loginFailed());
  }
};