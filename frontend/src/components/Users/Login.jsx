import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

import AuthForm from "./AuthForm.jsx";
import authStore from "../../store/authStore.js";

const Login = () => {
  const { login } = authStore();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
    usernameEmpty: undefined,
    passwordEmpty: undefined
  });
  const { username, password, showPassword, usernameEmpty, passwordEmpty } = values;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value, [`${name}Empty`]: false });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !showPassword,
    });
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
    login({ username, password });
  }

  return (
    <AuthForm onClick={handleClick} type={'login'}>
      <TextField label={"Utilisateur"} name={'username'} value={username} onChange={handleChange}
                 error={usernameEmpty}/>
      <TextField label={"Mot de passe"} name={'password'} value={password} type={showPassword ? 'text' : 'password'}
                 onChange={handleChange} error={passwordEmpty} InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>)
      }}/>
    </AuthForm>
  );
};

export default Login;