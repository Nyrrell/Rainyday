import { LinearProgress } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

import userStore from "../store/userStore.js";
import { mobile } from "../responsive.js";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1625768376503-68d2495d78c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark);
`;


const Wrapper = styled.div`
  position: absolute;
  width: 20%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;

`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  text-transform: uppercase;
`;

const Error = styled.span`
  color: red;
`;

const Fetching = styled(LinearProgress)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { isFetching, error, login } = userStore();

  const handleClick = (e) => {
    e.preventDefault();
    login({ username, password });
  }

  return (
    <Container>
      <Wrapper>
        {isFetching && <Fetching />}
        <Title>Connexion</Title>
        <Form>
          <Input placeholder={"Utilisateur"}
                 onChange={(e) => setUsername(e.target.value)}
          />
          <Input placeholder={"Mot de passe"}
                 type={'password'}
                 onChange={(e) => setPassword(e.target.value)}
          />
          { error && <Error>Utilisateur ou Mot de passe incorrect</Error>}
          <Button onClick={handleClick} disabled={isFetching}>Connexion</Button>
          <Link>Mot de passe oublié ?</Link>
          <Link>Créer un compte</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;