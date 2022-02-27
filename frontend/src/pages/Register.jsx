import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useState } from "react";

import AuthForm from '../components/AuthForm.jsx'
import authStore from "../store/authStore.js";


const IconPassword = ({ onClick, show }) => {
  return (<InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      onClick={onClick}
      edge="end"
    >
      {show ? <VisibilityOff/> : <Visibility/>}
    </IconButton>
  </InputAdornment>);
}

const Register = () => {
  const { register } = authStore();
  const [values, setValues] = useState({
    username: {
      value: '',
      error: false,
      feedback: 'Minimum 3 caractères.'
    },
    email: {
      value: '',
      error: false,
      feedback: 'Adresse mail invalide.'
    },
    password: {
      value: '',
      error: false,
      feedback: 'Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre.'
    },
    passwordConfirm: {
      value: '',
      error: false,
      feedback: 'Les mots de passe ne sont pas identique.'
    },
    showPassword: false,
  });
  const {
    username,
    email,
    password,
    passwordConfirm,
    showPassword,
  } = values;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: { ...values[name], value: value } });
  };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !showPassword,
    });
  };

  const formValidation = () => {
    const usernameRegEx = RegExp(/^[a-z0-9-_]{3,}$/);
    const emailRegEx = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordRegEx = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

    const userIsValid = usernameRegEx.test(username['value']);
    const emailIsValid = emailRegEx.test(email['value']);
    const passwordIsValid = passwordRegEx.test(password['value']);
    const passwordAreSame = password['value'] === passwordConfirm['value'];

    setValues({
      ...values,
      username: { ...values['username'], error: !userIsValid },
      email: { ...values['email'], error: !emailIsValid },
      password: { ...values['password'], error: !passwordIsValid },
      passwordConfirm: { ...values['passwordConfirm'], error: !passwordAreSame },
    });

    return userIsValid && emailIsValid && passwordIsValid && passwordAreSame;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;
    register({ username: username['value'], password: password['value'], email: email['value'] });
  }

  return (
    <AuthForm to={'/login'} onClick={handleClick} type={'register'}>
      <TextField label={"Utilisateur"} name={'username'} value={username['value']} onChange={handleChange}
                 error={username['error']} helperText={username['feedback']}/>
      <TextField label={"Email"} name={'email'} value={email['value']} onChange={handleChange} type={'email'}
                 error={email['error']} helperText={email['error'] && email['feedback']}/>
      <TextField label={"Mot de passe"} name={'password'} value={password['value']} onChange={handleChange}
                 type={showPassword ? 'text' : 'password'} error={password['error']}
                 helperText={password['feedback']}
                 InputProps={{ endAdornment: <IconPassword onClick={handleShowPassword} show={showPassword}/> }}/>
      <TextField label={"Confirmer le mot de passe"} name={'passwordConfirm'} value={passwordConfirm['value']}
                 type={showPassword ? 'text' : 'password'} onChange={handleChange} error={passwordConfirm['error']}
                 helperText={passwordConfirm['error'] && passwordConfirm['feedback']}
                 InputProps={{
                   endAdornment: <IconPassword onClick={handleShowPassword} show={showPassword}/>
                 }}/>
    </AuthForm>
  );
};

export default Register;