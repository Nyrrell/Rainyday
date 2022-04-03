import { TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect } from 'react';

import { ValidateForm } from "../../../hooks/ValidateForm.js";
import useForm from "../../../hooks/UseForm.jsx";

import userStore from "../../../store/userStore.js";

const Container = styled.form`
  background-color: var(--color-dark-alt);
  border: 2px solid var(--color-gray);
  display: flex;
  flex-wrap: wrap;
`;

const Username = styled.p`
  flex: 0 0 100%;
  padding: 1rem;
  font-size: 3rem;
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-yellow);
`;

const Detail = styled.div`
  flex: 1;
  padding: 1rem;

  & .sub-detail {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  & .MuiOutlinedInput-root, .MuiInputLabel-root {
    color: var(--color-light);
  }
  
  & .MuiOutlinedInput-root {
    background: var(--color-gray);
  }
`;

const ProfileTabs = () => {
  const { getUserProfile, userProfile } = userStore();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, ValidateForm, userProfile);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  function login() {
    console.log('No errors, submit callback called!');
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Username>{userProfile['username']}</Username>
      <Detail>
        <TextField label={"Email"} name={'email'} value={values.email || ''} onChange={handleChange} type={'email'}
                   error={Boolean(errors.email)} helperText={errors.email}/>
        <button type="submit" className="button is-block is-info is-fullwidth">Login</button>
      </Detail>
      <Detail>
        bla bla
      </Detail>
    </Container>
  );
};

export default ProfileTabs;