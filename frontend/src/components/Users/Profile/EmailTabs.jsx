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

const EmailTabs = () => {
  const { userProfile } = userStore();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, ['email']);


  function login() {
    console.log('No errors, submit callback called!'); // TODO
  }

  return (
    <Container>
      <Field label={'Email'} value={userProfile.email} disabled fullWidth/>
      <Field label={"Changer d'email ?"} name={'email'} value={values['email'] || ''} onChange={handleChange} fullWidth
             type={'email'} error={Boolean(errors.email)} helperText={errors.email}/>
      <Valid variant="outlined" onClick={handleSubmit}>Valider</Valid>
    </Container>
  );
};

export default EmailTabs;