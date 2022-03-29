import { Alert, Button, LinearProgress } from "@mui/material";
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
  margin: 1rem 0;
`;

const Feedback = styled(Alert)`
  flex: 0 0 100%;
  margin-bottom: 1rem;
`;

const Fetching = styled(LinearProgress)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BtnContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const AdminForm = ({ children, title, valid, close, error, fetching }) => {
  return (
    <Form>
      <Title>{title}</Title>
      {error && <Feedback variant={"outlined"} severity={"error"}>Une erreur est survenue !</Feedback>}
      {children}
      <BtnContainer>
        <Button variant={'contained'} color="info" onClick={valid}>Enregistrer</Button>
        <Button variant={'outlined'} color="error" onClick={close}>Annuler</Button>
      </BtnContainer>
      {fetching && <Fetching/>}
    </Form>
  );
};

export default AdminForm;