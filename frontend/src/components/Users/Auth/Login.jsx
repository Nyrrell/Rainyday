import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";

import AuthForm from "./AuthForm.jsx";
import authStore from "../../../store/authStore.js";
import PasswordField from "../../Common/PasswordField.jsx";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const { login } = authStore();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
    usernameEmpty: undefined,
    passwordEmpty: undefined
  });
  const { username, password, usernameEmpty, passwordEmpty } = values;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value, [`${name}Empty`]: false });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setValues({
        ...values,
        usernameEmpty: !Boolean(username),
        passwordEmpty: !Boolean(password)
      })
    }
    login({ username, password }, () => setTimeout(() => navigate(from, { replace: true }), 1000));
  }

  return (
    <AuthForm onClick={handleClick} type={'login'}>
      <TextField label={"Utilisateur"} name={'username'} value={username} onChange={handleChange}
                 error={usernameEmpty}/>
      <PasswordField label={"Mot de passe"} name={'password'} value={password} onChange={handleChange} error={passwordEmpty} />
    </AuthForm>
  );
};

export default Login;