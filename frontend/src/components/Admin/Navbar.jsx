import { PowerSettingsNew } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { mobile } from "../../responsive.js";
import authStore from "../../store/authStore.js";

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
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
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  cursor: pointer;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
  color: #555;
`;

function Navbar() {
  const { token, logout } = authStore();
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
          <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>{process.env.REACT_APP_NAME}</Logo>
          </Link>
        </Left>
        <Right>
          <MenuItem>{token['username']}</MenuItem>
          <MenuItem>
            <PowerSettingsNew onClick={handleClick}/>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;