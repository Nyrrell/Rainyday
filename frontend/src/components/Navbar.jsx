import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { ShoppingCartOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import { Badge } from '@mui/material';

import logo from "../assets/logo.png";
import authStore from "../store/authStore.js";
import cartStore from "../store/cartStore.js";
import media from "css-in-js-media";
import { categories } from "../data";

const Wrapper = styled.nav`
  height: 90px;
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

  ${media("<=phone")} {
    padding: 10px 0;
    height: 50px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  ${media("<=phone")} {
    display: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.img`
  height: 70px;

  ${media("<=phone")} {
    height: 40px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 25px;
  
  ${media("<=phone")} {
    display: none;
  }
`;

const MenuItem = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${media("<=phone")} {
    font-size: 12px;
    margin-left: 10px
  }
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

const IsLogged = ({ user, onClick }) => (
  !Boolean(user) ? (
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
      <MenuItem>{user}</MenuItem>
      <MenuItem onClick={onClick}>déconnexion</MenuItem>
      <MenuItem>
        <Link to={'/account'}>mon compte</Link>
      </MenuItem>
    </>
  )
);

const Navbar = () => {
  const { logout, username } = authStore();
  const quantity = cartStore(state => state.quantity);

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Wrapper>
      <Left>
        <NavLink to={'/'}>home</NavLink>
        {categories.map(item => <NavLink to={`/products/${item['cat']}`} key={item['cat']}>{item['cat']}</NavLink>)}
      </Left>
      <Center>
        <Link to={'/'}><Logo src={logo} alt="Logo"/></Link>
      </Center>
      <Right>
        <IsLogged user={username} onClick={handleClick}/>
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