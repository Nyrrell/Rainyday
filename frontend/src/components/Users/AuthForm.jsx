import { Alert, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "css-in-js-media";

import authStore from "../../store/authStore.js";

const Wrapper = styled.div`
  width: 25vw;
  padding: 20px;
  color: var(--color-dark);
  background-color: var(--color-light);

  ${media("<=phone")} {
    width: 75%
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 300;
  margin: 0;
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

const AuthForm = ({ children, onClick, type }) => {
  const { isFetching, error, status, message, clearError, username } = authStore();

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
    <>
      <Wrapper>
        <Title>{type === 'login' ? 'Connexion' : 'Inscription'}</Title>
        {error &&
          (<Alert severity="error">
            <AlertMessage/>
          </Alert>)
        }
        {username && <Alert severity="success">Connexion réussie</Alert>}
        <Form onKeyPress={e => e.key === 'Enter' && onClick(e)}>
          {children}
          <Button variant={'contained'} onClick={onClick}
                  disabled={isFetching}>{type === 'login' ? 'Connexion' : 'Enregistrer'}</Button>
          <LinkTo to={type === 'login' ? '/register' : '/login'}
                  onClick={clearError}>
            {type === 'login' ? 'Créer un compte' : 'Déjà un compte ?'}
          </LinkTo>
          {/*<Link>Mot de passe oublié ?</Link>*/}
        </Form>
        {isFetching && <Fetching/>}
      </Wrapper>
    </>
  );
};

export default AuthForm;