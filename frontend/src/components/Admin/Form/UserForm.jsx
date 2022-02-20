import styled from "styled-components";
import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from "@mui/material";

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

const FormLeft = styled.div``;

const FormRight = styled.div`
  margin-left: 10px;
`;

const BtnContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const UserForm = ({ user, type, close }) => {
  const initialState = {
    username: '',
    email: '',
    phone: '',
    lastname: '',
    firstname: '',
    credit: '',
  };

  const [data, setData] = useState(user ?? initialState);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.name === 'inStock' ? e.target.checked : e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
  }

  return (
    <Form>
      <Title>{user ? "Edition" : "Nouvel Utilisateur"}</Title>
      <FormGroup>
        <FormLeft>
          <TextField fullWidth label="Nom d'utilisateur*" value={data['username']} name={'username'} size="small" onChange={handleChange}/>
          <TextField fullWidth label="Nom" value={data['lastname']} name={'lastname'} size="small" onChange={handleChange}/>
          <TextField fullWidth label="Avoir" value={data['credit']} name={'credit'} size="small" onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}/>
        </FormLeft>
        <FormRight>
          <TextField fullWidth label="Adresse email*" value={data['email']} name={'email'} size="small" type={'email'} onChange={handleChange}/>
          <TextField fullWidth label="Prénom" value={data['firstname']} name={'firstname'} size="small" onChange={handleChange}/>
          <TextField fullWidth label="Téléphone" value={data['phone']} name={'phone'} size="small" onChange={handleChange}/>
        </FormRight>
      </FormGroup>
      <BtnContainer>
        <Button variant={'contained'} color="info" onClick={handleClick} id={type}>{type}</Button>
        <Button variant={'outlined'} color="error" onClick={close}>Annuler</Button>
      </BtnContainer>
    </Form>
  );
};

export default UserForm;