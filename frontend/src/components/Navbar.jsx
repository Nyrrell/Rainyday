import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import React from 'react';

import { mobile } from "../responsive.js";
import { userLogout } from "../redux/apiCalls.js";

const Container = styled.nav`
  height: 60px;

  & a {
    text-decoration: none;
    color: inherit;
  }

  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
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

  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state => state['cart']['quantity']);
  const user = useSelector(state => state['user']['currentUser']);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    userLogout(dispatch)
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {/*<SearchContainer>*/}
          {/*  <Input/>*/}
          {/*  <Search style={{ color: 'gray', fontSize: 16 }}/>*/}
          {/*</SearchContainer>*/}
        </Left>
        <Link to={'/'}>
          <Center><Logo>{process.env.REACT_APP_NAME}</Logo></Center>
        </Link>
        <Right>
          {!user ? (
            <>
              <Link to={'/register'}>
                <MenuItem>INSCRIPTION</MenuItem>
              </Link>
              <Link to={'/login'}>
                <MenuItem>CONNEXION</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <MenuItem onClick={handleClick}>DÉCONNEXION</MenuItem>
              <Link to={'/account'}>
                <MenuItem>MON COMPTE</MenuItem>
              </Link>
            </>
          )}
          <Link to={'/cart'}>
            <MenuItem>
              <Badge badgeContent={quantity} color={"error"}>
                <ShoppingCartOutlined/>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
    ;
};

export default Navbar;