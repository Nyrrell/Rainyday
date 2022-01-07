import { NotificationsNone, Settings } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import styled from "styled-components";

import { mobile } from "../../responsive.js";

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
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
  font-size: 14px;
  cursor: pointer;
  color: #555;
`;

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>STICKER SHOP</Logo>
        </Left>
        <Right>
          <MenuItem>
            <Badge badgeContent={1} color={"error"} >
              <NotificationsNone/>
            </Badge>
          </MenuItem>
          <MenuItem>
            <Settings/>
          </MenuItem>
          <MenuItem>
            Username
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;