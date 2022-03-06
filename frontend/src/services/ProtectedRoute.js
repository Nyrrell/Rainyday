import { useLocation, Navigate } from "react-router-dom";

import authStore from "../store/authStore.js";
import NoMatch from "../pages/NoMatch.jsx";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = authStore();

  return token ? children : <Navigate to="/login" state={{ from: location }} replace/>;
};

export const AlreadyAuth = ({ children }) => {
  const { token } = authStore();

  return !token ? children : <Navigate to="/" replace/>;
};

export const RequireAuthorization = ({ children }) => {
  const { authorize } = authStore();
  return authorize ? children : <NoMatch/>
};