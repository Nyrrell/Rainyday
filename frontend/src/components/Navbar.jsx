import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { ShoppingCartOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Badge } from '@mui/material';
import React from 'react';

import { userLogout } from "../reducers/apiCalls.js";
import { mobile } from "../responsive.js";
import { categories } from "../data";
import userReducer from "../reducers/userReducer.js";

const Wrapper = styled.nav`
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--color-blue);
  box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.5);
  color: var(--color-light);
  position: sticky;
  top: 0;
  z-index: 100;

  ${mobile({ padding: "10px 0", height: "50px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 25px;

  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const CartBadge = styled(Badge)`
  .MuiBadge-badge {
    font-weight: 600;
  }
`;

const StyledLink = styled(Link)`
  border-bottom: ${({ active }) => active && '2px solid var(--color-yellow)'};

  &:hover {
    border-bottom: 2px solid var(--color-yellow);
  }
`;


const NavLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <MenuItem>
      <StyledLink to={to} active={match && 'true'} {...props}>{children}</StyledLink>
    </MenuItem>
  );
}

const Navbar = () => {
  const quantity = useSelector(state => state['cart']['quantity']);
  // const user = useSelector(state => state['user']['currentUser']);
  const { currentUser: user, logout } = userReducer();
  // const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    // userLogout(dispatch)
    logout();
  };

  return (
    <Wrapper>
      <Left>
        <NavLink to={'/'}>home</NavLink>
        {categories.map(item => <NavLink to={`/products/${item['cat']}`} key={item['cat']}>{item['cat']}</NavLink>)}
      </Left>
      <Center>
        <Logo>
          <Link to={'/'}>{process.env.REACT_APP_NAME}</Link>
        </Logo>
      </Center>
      <Right>
        {!user ? (
          <>
            <MenuItem>
              <Link to={'/register'}>inscription</Link>
            </MenuItem>
            <MenuItem>
              <Link to={'/login'}>connexion</Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClick}>déconnexion</MenuItem>
            <MenuItem>
              <Link to={'/account'}>mon compte</Link>
            </MenuItem>
          </>
        )}
        <MenuItem>
          <Link to={'/cart'}>
            <CartBadge badgeContent={quantity} color={"error"}>
              <ShoppingCartOutlined/>
            </CartBadge>
          </Link>
        </MenuItem>
      </Right>
    </Wrapper>
  );
};

export default Navbar;