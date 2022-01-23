import styled from "styled-components";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  Category
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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

const Element = ({ to, children }) => (
  <Link to={to}>
    <ListItem>
      {children}
    </ListItem>
  </Link>
);

function Sidebar() {
  return (
    <Container>
      <Wrapper>
        <MenuItem>
          <Title>Dashboard</Title>
          <List>
            <Element to={'/admin/'}><LineStyle/> Accueil</Element>
            <Element to={'/admin/sales'}><AttachMoney/> Ventes</Element>
          </List>
        </MenuItem>

        <MenuItem>
          <Title>Gestion</Title>
          <List>
            <Element to={'/admin/users'}><PermIdentity/> Utilisateurs</Element>
            <Element to={'/admin/categories'}><Category/> Catégories</Element>
            <Element to={'/admin/products'}><Storefront/> Produits</Element>
          </List>
        </MenuItem>
      </Wrapper>
    </Container>
  )
    ;
}

export default Sidebar;