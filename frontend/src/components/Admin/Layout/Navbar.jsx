import { AttachMoney, Category, LocalOffer, Logout, PermIdentity, Storefront } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import media from "css-in-js-media";
import authStore from "../../../store/authStore.js";

const Container = styled.header`
  height: 60px;
  background-color: #232e3c;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;

  //:after {
  //  content: "";
  //  height: 9rem;
  //  position: absolute;
  //  top: 100%;
  //  left: 0;
  //  right: 0;
  //  background-color: inherit;
  //  z-index: -1;
  //  //box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  //}
  ${media("<=phone")} {
    height: 50px
  }
`;

const Wrapper = styled.nav`
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.ul`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  padding: 0;
  list-style: none;
  color: lightgrey;

  & > a {
    transition: all .2s;
  }

  & > a:hover {
    color: var(--color-light);
  }
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 1rem;
  color: var(--color-light);
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;

  & > svg {
    font-size: 1rem;
  }
`;

const NavLink = ({ to, children }) => (
  <Link to={'/admin/' + to}>
    <MenuItem>
      {children}
    </MenuItem>
  </Link>
);

function Navbar() {
  const { username, logout } = authStore();
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={'/'}>
            <Logo>{process.env.REACT_APP_NAME}</Logo>
          </Link>
          <NavLink to={'sales'}>
            <AttachMoney/> Ventes
          </NavLink>
          <NavLink to={'users'}>
            <PermIdentity/> Utilisateurs
          </NavLink>
          <NavLink to={'categories'}>
            <Category/> Catégories
          </NavLink>
          <NavLink to={'products'}>
            <Storefront/> Produits
          </NavLink>
          <NavLink to={'discounts'}>
            <LocalOffer/> Code Promo
          </NavLink>
        </Left>
        <Right>
          <MenuItem>{username.toUpperCase()}</MenuItem>
          <Logout cursor={"pointer"} titleAccess={'déconnexion'} onClick={handleClick}/>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;