import styled from "styled-components";

const Container = styled.div`
  flex: 5;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1``;

const AddUser = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 16px;
`;

const Form = styled.div`
  display: flex;
  margin-top: 20px;
`;

const User = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Utilisateur</Title>
        <AddUser>Créer</AddUser>
      </TitleContainer>
      <Form>

      </Form>
    </Container>
  );
};

export default User;