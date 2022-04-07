import { Button, TextField } from "@mui/material";
import styled from "styled-components";

import useForm from "../../../hooks/UseForm.jsx";

import userStore from "../../../store/userStore.js";

const Container = styled.form`
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 10px;
`;

const Field = styled(TextField)`

  & .MuiOutlinedInput-root {
    background: var(--color-gray);
  }

  & .MuiInputBase-input, .MuiInputLabel-outlined {
    color: var(--color-light);
  }

  & .Mui-disabled {
    -webkit-text-fill-color: inherit;
    opacity: 0.7;
  }
`;

const Valid = styled(Button)`
`;

const PasswordTabs = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, ['newPassword']);


  function login() {
    console.log('No errors, submit callback called!'); // TODO
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Field label={'Mot de passe actuel'} name={'currentPassword'} value={values['currentPassword'] || ''} fullWidth
             onChange={handleChange} type={'password'} error={Boolean(errors['currentPassword'])}
             helperText={errors['currentPassword']}/>
      <Field label={"Nouveau mot de passe"} name={'newPassword'} value={values['newPassword'] || ''} onChange={handleChange}
             fullWidth type={'password'} error={Boolean(errors['newPassword'])} helperText={errors['newPassword']}/>
      <Field label={"Confirmer mot de passe"} name={'newPasswordConfirm'} value={values['newPasswordConfirm'] || ''}
             onChange={handleChange} fullWidth type={'password'} error={Boolean(errors['newPasswordConfirm'])}
             helperText={errors['newPasswordConfirm']}/>
      <Valid variant="outlined" type={"submit"}>Valider</Valid>
    </Container>
  );
};

export default PasswordTabs;