import { Button } from "@mui/material";
import styled from "styled-components";
import React from 'react';

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

const BtnContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const AdminForm = ({ children, title, valid, close }) => {
  return (
    <Form>
      <Title>{title}</Title>
      {children}
      <BtnContainer>
        <Button variant={'contained'} color="info" onClick={valid}>Enregistrer</Button>
        <Button variant={'outlined'} color="error" onClick={close}>Annuler</Button>
      </BtnContainer>
    </Form>
  );
};

export default AdminForm;