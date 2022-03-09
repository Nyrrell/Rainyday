import { Button, InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from 'react';
import userStore from "../../../../store/userStore.js";

const Form = styled.form`
  padding: 0 1.5rem 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  flex: 0 0 100%;
  padding: 20px 0;
`;

const FormGroup = styled.div`
  display: flex;

  & > div > :not(style) {
    margin: 0.5rem 0;
  }
`;

const FormLeft = styled.div`
  flex: 1;
`;

const FormRight = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const BtnContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const UserForm = ({ user, type, close }) => {
  const { updateUser } = userStore();  // TODO FETCHING & ERROR
  const [data, setData] = useState(user);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateUser(data);
  }

  return (
    <Form>
      <Title>{"Edition utilisateur"}</Title>
      <FormGroup>
        <FormLeft>
          <TextField fullWidth label="Nom d'utilisateur" value={data['username']} name={'username'} size="small"
                     disabled/>
          <TextField fullWidth label="Nom" value={data['lastname']} name={'lastname'} size="small" disabled/>
          <TextField fullWidth label="Avoir" value={data['credit']} name={'credit'} size="small" onChange={handleChange}
                     InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}/>
        </FormLeft>
        <FormRight>
          <TextField fullWidth label="Adresse email" value={data['email']} name={'email'} size="small" type={'email'}
                     disabled/>
          <TextField fullWidth label="Prénom" value={data['firstname']} name={'firstname'} size="small" disabled/>
        </FormRight>
      </FormGroup>
      <BtnContainer>
        <Button variant={'contained'} color="info" onClick={handleClick} id={type}>Enregistrer</Button>
        <Button variant={'outlined'} color="error" onClick={close}>Annuler</Button>
      </BtnContainer>
    </Form>
  );
};

export default UserForm;