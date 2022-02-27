import { Alert, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { mobile } from "../responsive.js";
import authStore from "../store/authStore.js";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  color: var(--color-dark);
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1625768376503-68d2495d78c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 25vw;
  padding: 20px;
  background-color: var(--color-light);
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  & > div > :not(style) {
    margin: 0.5rem 0;
  }

  & > div > p {
    margin: 0 0 0.5rem 0.5rem;
  }

  & > button {
    margin-top: 1rem;
  }
`;

const LinkTo = styled(Link)`
  margin: 0.5rem 0;
  text-decoration: underline;
  width: fit-content;
`;

const Fetching = styled(LinearProgress)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const AuthForm = ({ children, onClick, to, type }) => {
  const { isFetching, error, status, message, clearError } = authStore();

  const AlertMessage = () => {
    switch (status) {
      case 401:
        return message;
      case 409:
        return message;
      default:
        return ("Une erreur est survenue.");
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>{type === 'login' ? 'Connexion' : 'Inscription'}</Title>
        {error &&
          (<Alert severity="error">
            <AlertMessage/>
          </Alert>)
        }
        <Form onKeyPress={e => e.key === 'Enter' && onClick(e)}>
          {children}
          <Button variant={'contained'} onClick={onClick}
                  disabled={isFetching}>{type === 'login' ? 'Connexion' : 'Enregistrer'}</Button>
          <LinkTo to={to} onClick={clearError}>{type === 'login' ? 'Créer un compte' : 'Déjà un compte ?'}</LinkTo>
          {/*<Link>Mot de passe oublié ?</Link>*/}
        </Form>
        {isFetching && <Fetching/>}
      </Wrapper>
    </Container>
  );
};

export default AuthForm;