import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgb(9, 9, 121);
  background: linear-gradient(324deg, rgba(9, 9, 121, 1) 0%, rgba(0, 212, 255, 1) 100%);
  color: white;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 30vh;
`;

const SubTitle = styled.h2`
  font-weight: 600;
  font-size: 10vh;
  margin-bottom: 50px;
`;

const Button = styled.button`
  height: 50px;
  width: 300px;
  font-size: 20px;
  border: none;
  border-radius: 50px;
  background-color: deepskyblue;
  font-weight: 600;

  cursor: pointer;
`;

function NoMatch() {
  return (
    <Container>
      <Title>404</Title>
      <SubTitle>Circulez y'a rien à voir</SubTitle>
      <Button>
        <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Retourner à la page d'accueil</Link>
      </Button>
    </Container>
  );
}

export default NoMatch;