import { PowerSettingsNew } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import media from "css-in-js-media";
import authStore from "../../../store/authStore.js";

const Container = styled.div`
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
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  ${media("<=phone")} { height: 50px }
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  cursor: pointer;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const MenuAction = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const MenuItem = styled.div`
  margin: 0 10px;
`;

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
        </Left>
        <Right>
          <MenuItem>{username.toUpperCase()}</MenuItem>
          <MenuAction>
            <PowerSettingsNew onClick={handleClick}/>
          </MenuAction>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;