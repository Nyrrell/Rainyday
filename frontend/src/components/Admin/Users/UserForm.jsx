import { InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from 'react';

import AdminForm from "../AdminForm.jsx";
import userStore from "../../../store/userStore.js";

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

const UserForm = ({ user, close }) => {
  const { updateUser, error, isFetching } = userStore();
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
    <AdminForm title={"Edition utilisateur"} valid={handleClick} close={close} error={error} fetching={isFetching}>
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
    </AdminForm>
  );
};

export default UserForm;