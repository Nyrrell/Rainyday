import { Tab, Tabs } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";

import BaseTitle from "../../Common/BaseTitle.jsx";
import PasswordTabs from "./PasswordTabs.jsx";
import EmailTabs from "./EmailTabs.jsx";
import OrderTabs from "./OrderTabs.jsx";
import TabPanel from "./TabPanel.jsx";

import userStore from "../../../store/userStore.js";

const StyledTabs = styled(Tabs)`
  margin-top: 2rem;

  & .MuiTabs-indicator {
    background-color: var(--color-yellow);
  }

  & .MuiTab-root {
    color: var(--color-light);
    font-weight: 800;
  }
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 2px solid var(--color-gray);
  border-bottom: 1px solid var(--color-yellow);
  background-color: var(--color-dark-alt);
`;

const Username = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
`;

const Credit = styled.p`
align-self: end;
`;


const AccountPage = () => {
  const [value, setValue] = useState(0);
  const { getUserProfile, userProfile } = userStore();

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BaseTitle>Mon compte</BaseTitle>
      <StyledTabs textColor="inherit" value={value} onChange={handleChange}>
        <Tab label="Commande" id={'0'}/>
        <Tab label="Email" id={'1'}/>
        <Tab label="Mot de passe" id={'1'}/>
      </StyledTabs>
      <UserDetail>
        <Username>{userProfile['username']}</Username>
        {(userProfile.credit && value === 0) && <Credit>Avoir disponible : <strong>{userProfile.credit}€</strong></Credit>}
      </UserDetail>
      <TabPanel value={value} index={0}><OrderTabs/></TabPanel>
      <TabPanel value={value} index={1}><EmailTabs/></TabPanel>
      <TabPanel value={value} index={2}><PasswordTabs/></TabPanel>
    </>
  );
};

export default AccountPage;