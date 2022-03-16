import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import authStore from "../store/authStore.js";
import NoMatch from "../components/NoMatch.jsx";

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
  const [isAdmin, setIsAdmin] = useState(null);
  const { authorize } = authStore();

  useEffect(() => {
    authorize().then(res => setIsAdmin(res))
  }, [authorize]);

  if (isAdmin === null) return null;
  return isAdmin ? children : <NoMatch/>;
};