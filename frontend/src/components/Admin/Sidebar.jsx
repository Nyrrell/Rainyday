import styled from "styled-components";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report
} from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 60px);
  background-color: rgb(250, 250, 255);
  position: sticky;
  top: 60px;
`;

const Wrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 13px;
  color: #a8a8a8;
`;

const List = styled.ul`
  list-style: none;
  padding: 5px;
`;

const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:active, :hover {
    background-color: rgb(240, 240, 255);
  }

  & > svg {
    margin-right: 5px;
    font-size: 20px;
  }
`;

function Sidebar() {
  return (
    <Container>
      <Wrapper>
        <MenuItem>
          <Title>Dashboard</Title>
          <List>
            <ListItem>
              <LineStyle/>
              Accueil
            </ListItem>
            <ListItem>
              <Timeline/>
              Analytiques
            </ListItem>
            <ListItem>
              <TrendingUp/>
              Ventes
            </ListItem>
          </List>
        </MenuItem>
        <MenuItem>
          <Title>Acces Rapide</Title>
          <List>
            <ListItem>
              <PermIdentity/>
              Utilisateurs
            </ListItem>
            <ListItem>
              <Storefront/>
              Produits
            </ListItem>
            <ListItem>
              <AttachMoney/>
              Transactions
            </ListItem>
            <ListItem>
              <BarChart/>
              Raports
            </ListItem>
          </List>
        </MenuItem>
        <MenuItem>
          <Title>Notifications</Title>
          <List>
            <ListItem>
              <MailOutline/>
              Mail
            </ListItem>
            <ListItem>
              <DynamicFeed/>
              Retour
            </ListItem>
            <ListItem>
              <ChatBubbleOutline/>
              Messages
            </ListItem>
          </List>
        </MenuItem>
        <MenuItem>
          <Title>Staff</Title>
          <List>
            <ListItem>
              <WorkOutline/>
              Configurer
            </ListItem>
            <ListItem>
              <Timeline/>
              Analyses
            </ListItem>
            <ListItem>
              <Report/>
              Rapports
            </ListItem>
          </List>
        </MenuItem>
      </Wrapper>
    </Container>
  );
}

export default Sidebar;