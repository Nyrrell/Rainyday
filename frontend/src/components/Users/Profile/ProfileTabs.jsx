import { Tab, Tabs } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

import BaseTitle from "../../Common/BaseTitle.jsx";
import TabPanel from "./TabPanel.jsx";
import Order from "./Order.jsx";

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

const ProfileTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BaseTitle>Mon compte</BaseTitle>
      <StyledTabs textColor="inherit" value={value} onChange={handleChange}>
        <Tab label="Profile" id={'0'}/>
        <Tab label="Commande" id={'1'}/>
      </StyledTabs>
      <TabPanel value={value} index={0}>PROFILE</TabPanel>
      <TabPanel value={value} index={1}><Order /></TabPanel>
    </>
  );
};

export default ProfileTabs;