import { TextField, Button, FormControl, FormGroup } from "@mui/material";

import styled from "styled-components";
import {
  Home,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Stars
} from "@mui/icons-material";


const Container = styled.div`
  flex: 5;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1``;

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

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  font-weight: 600;
  margin: 0 10px 20px 20px;
`;

const UserShowInfo = styled.div`
  margin: 20px 0;
  color: #444;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`;

const UserSubTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > svg {
    font-size: 16px;
    padding-right: 10px;
  }
`;

const UserValue = styled.span`
  font-size: 18px;
`;

const Form = styled.form`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const LeftForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  flex: 1;

`;

const RightForm = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const User = () => {
  return (
    <Container>
      <TitleContainer>
        <PageTitle>Utilisateur</PageTitle>
        <AddUser>Créer</AddUser>
      </TitleContainer>
      <UserContainer>
        <UserInfo>
          <Title>
            Anna Becker <Stars htmlColor={'gold'} titleAccess={'Administrateur'}/>
          </Title>
          <UserShowInfo>
            <UserSubTitle><PermIdentity/> Nom d'utilisateur</UserSubTitle>
            <UserValue>annabeck99</UserValue>
          </UserShowInfo>
          <UserShowInfo>
            <UserSubTitle><MailOutline/> Email</UserSubTitle>
            <UserValue>annabeck99@gmail.com</UserValue>
          </UserShowInfo>
          <UserShowInfo>
            <UserSubTitle><Home/> Adresse</UserSubTitle>
            <UserValue>5 Avenue nul oui monsieur</UserValue>
            <UserValue>54000 NANCY</UserValue>
          </UserShowInfo>
          <UserShowInfo>
            <UserSubTitle><PhoneAndroid/> Téléphone</UserSubTitle>
            <UserValue>06 01 02 03 04</UserValue>
          </UserShowInfo>
        </UserInfo>
        <Form>
          <Title>Edition</Title>
          <FormControl style={{display: 'flex'}}>
            <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField label="Nom" variant="outlined" defaultValue={'Becker'} name={'lastName'}/>
              <TextField label="Prénom" variant="outlined" defaultValue={'Anna'} name={'firstName'}/>
              <TextField label="Nom d'utilisateur" variant="outlined" defaultValue={'annabeck99'} name={'userName'}/>
              <TextField label="Adresse email" variant="outlined" defaultValue={'annabeck99@gmail.com'} name={'email'}/>
            </FormGroup>
            <FormGroup>
              <TextField label="Addresse" variant="outlined" defaultValue={'5 Avenue nul oui monsieur'}
                         name={'address'}/>
              <TextField label="Code Postal" variant="outlined" defaultValue={'54000'} name={'postalCode'}/>
              <TextField label="Ville" variant="outlined" defaultValue={'Nancy'} name={'city'}/>
              <TextField label="Téléphone" variant="outlined" defaultValue={'06 01 02 03 04'} name={'phone'}/>
            </FormGroup>
          </FormControl>
          <Button variant={'contained'} color="info">Update</Button>
        </Form>
      </UserContainer>
    </Container>
  );
};

export default User;