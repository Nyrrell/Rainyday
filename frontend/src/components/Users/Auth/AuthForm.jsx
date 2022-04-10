import { Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "css-in-js-media";

import BaseTitle from "../../Common/BaseTitle.jsx";
import Feedback from "../../Common/Feedback.jsx";

import authStore from "../../../store/authStore.js";

const Wrapper = styled.div`
  width: 25vw;
  padding: 20px;
  background-color: var(--color-dark-alt);

  ${media("<=phone")} {
    width: 75%
  }
`;

const Title = styled(BaseTitle)`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LinkTo = styled(Link)`
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
          (<Feedback severity="error" light>
            <AlertMessage/>
          </Feedback>)
        }
        {username && <Feedback severity="success" light>Connexion réussie</Feedback>}
        <Form onKeyPress={e => e.key === 'Enter' && onClick(e)}>
          {children}
          <Button variant={'outlined'} onClick={onClick}
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