import { TextField } from "@mui/material";
import validator from 'validator';

import { useState } from "react";

import PasswordField from "../../Common/PasswordField.jsx";
import AuthForm from './AuthForm.jsx'

import authStore from "../../../store/authStore.js";

const Register = () => {
  const { isEmail, isStrongPassword, matches } = validator;

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
      feedback: 'Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre, 1 symbole.'
    },
    passwordConfirm: {
      value: '',
      error: false,
      feedback: 'Les mots de passe ne sont pas identique.'
    }
  });
  const {
    username,
    email,
    password,
    passwordConfirm,
  } = values;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: { ...values[name], value: value } });
  };

  const formValidation = () => {
    const userIsValid = matches(username['value'], /^[a-zA-Z0-9-_]{3,}$/);
    const emailIsValid = isEmail(email['value']);
    const passwordIsValid = isStrongPassword(password['value']);
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
    <AuthForm onClick={handleClick} type={'register'}>
      <TextField label={"Utilisateur"} name={'username'} value={username['value']} onChange={handleChange}
                 error={username['error']} helperText={username['feedback']}/>
      <TextField label={"Email"} name={'email'} value={email['value']} onChange={handleChange} type={'email'}
                 error={email['error']} helperText={email['error'] && email['feedback']}/>
      <PasswordField label={"Mot de passe"} name={'password'} value={password['value']} onChange={handleChange}
                     error={password['error']} helperText={password['feedback']}/>
      <PasswordField label={"Confirmer le mot de passe"} name={'passwordConfirm'} value={passwordConfirm['value']}
                     onChange={handleChange} error={passwordConfirm['error']}
                     helperText={passwordConfirm['error'] && passwordConfirm['feedback']}/>
    </AuthForm>
  );
};

export default Register;