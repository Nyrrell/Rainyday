import { TextField } from "@mui/material";

import PasswordField from "../../Common/PasswordField.jsx";
import AuthForm from './AuthForm.jsx'

import authStore from "../../../store/authStore.js";
import useForm from "../../../hooks/UseForm.jsx";

const Register = () => {
  const { register } = authStore();

  const submitRegister = () => {
    register({ username: values['username'], password: values['password'], email: values['email'] });
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(submitRegister, ['username', 'email', 'password', 'passwordConfirm']);

  return (
    <AuthForm onClick={handleSubmit} type={'register'}>
      <TextField label={"Utilisateur"} name={'username'} value={values['username'] || ''} onChange={handleChange}
                 error={Boolean(errors['username'])} helperText={'Minimum 3 caractères.'}/>
      <TextField label={"Email"} name={'email'} value={values['email'] || ''} onChange={handleChange} type={'email'}
                 error={Boolean(errors['email'])} helperText={errors['email']}/>
      <PasswordField label={"Mot de passe"} name={'password'} value={values['password'] || ''} onChange={handleChange}
                     error={Boolean(errors['password'])} helperText={'Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre, 1 symbole.'}/>
      <PasswordField label={"Confirmer le mot de passe"} name={'passwordConfirm'} value={values['passwordConfirm'] || ''}
                     onChange={handleChange} error={Boolean(errors['passwordConfirm'])}
                     helperText={errors['passwordConfirm']}/>
    </AuthForm>
  );
};

export default Register;