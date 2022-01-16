import { TextField, Button } from "@mui/material";

import styled from "styled-components";
import {
  Home,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Stars
} from "@mui/icons-material";

const PageTitle = styled.h1``;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserInfo = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px 40px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  font-weight: 600;
`;

const UserShowInfo = styled.div`
  margin: 20px 0;
  color: #444;
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
  padding: 20px 40px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const FormGroup = styled.div`
  display: flex;
`;

const FormLeft = styled.div``;

const FormRight = styled.div`
  margin-left: 10px;
`;

const User = () => {
  return (
    <>
      <PageTitle>Utilisateur</PageTitle>
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
          <FormGroup>
            <FormLeft>
              <TextField fullWidth label="Nom" defaultValue={'Becker'} name={'lastName'} size="small" margin="normal"/>
              <TextField fullWidth label="Prénom" defaultValue={'Anna'} name={'firstName'} size="small"
                         margin="normal"/>
              <TextField fullWidth label="Nom d'utilisateur" defaultValue={'annabeck99'} name={'userName'} size="small"
                         margin="normal"/>
              <TextField fullWidth label="Adresse email" defaultValue={'annabeck99@gmail.com'} name={'email'}
                         size="small" margin="normal"/>
            </FormLeft>
            <FormRight>
              <TextField fullWidth label="Addresse" defaultValue={'5 Avenue nul oui monsieur'} name={'address'}
                         size="small" margin="normal"/>
              <TextField fullWidth label="Code Postal" defaultValue={'54000'} name={'postalCode'} size="small"
                         margin="normal"/>
              <TextField fullWidth label="Ville" defaultValue={'Nancy'} name={'city'} size="small" margin="normal"/>
              <TextField fullWidth label="Téléphone" defaultValue={'06 01 02 03 04'} name={'phone'} size="small"
                         margin="normal"/>
            </FormRight>
          </FormGroup>
          <Button variant={'contained'} color="info">Update</Button>
        </Form>
      </UserContainer>
    </>
  );
};

export default User;