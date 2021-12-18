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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;

`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Créer un compte</Title>
        <Form>
          <Input placeholder={"Nom"}/>
          <Input placeholder={"Prénom"}/>
          <Input placeholder={"Username"}/>
          <Input placeholder={"Email"}/>
          <Input placeholder={"Mot de passe"}/>
          <Input placeholder={"Confirmer mot de passe"}/>
          <Agreement>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, suscipit. Accusamus asperiores
            assumenda autem blanditiis consequatur consequuntur, eos harum minus neque nulla possimus quaerat quidem
            ratione reiciendis repellendus veniam.
          </Agreement>
          <Button>Enregistrer</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;