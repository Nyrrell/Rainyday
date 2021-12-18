import styled from "styled-components";
import { mobile } from "../responsive.js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1625768376503-68d2495d78c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Wrapper = styled.div`
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
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  text-transform: uppercase;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Connexion</Title>
        <Form>
          <Input placeholder={"Username"}/>
          <Input placeholder={"Mot de passe"}/>
          <Button>Connexion</Button>
          <Link>Mot de passe oublié ?</Link>
          <Link>Créer un compte</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;