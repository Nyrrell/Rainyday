import styled from "styled-components";

const PageTitle = styled.h1``;

const Form = styled.form`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserNew = () => {
  return (
    <>
      <PageTitle>Nouvelle utilisateur</PageTitle>
      <Form>

      </Form>
    </>
  );
};

export default UserNew;