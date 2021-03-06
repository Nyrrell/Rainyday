import { AccountCircle, Visibility } from "@mui/icons-material";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { userRequest } from "../../hooks/requestApi.js";

const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const ListContainer = styled.div`
  display: flex;
`;

const ListTitle = styled.span`
  font-weight: 600;
  margin-right: 20px;
`;

const ListDesc = styled.span`
  font-weight: 300;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;

  & > svg {
    font-size: 16px;
    margin-right: 5px;
  }
`;

const WidgetSm = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await userRequest.get("users/?new=true");
        setUsers(data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <Container>
      <Title>Nouveaux membres</Title>
      <List>
        {users.map(user => (
          <ListItem key={user['_id']}>
            <AccountCircle/>
            <ListContainer>
              <ListTitle>{user['username']}</ListTitle>
              <ListDesc>{user['email']}</ListDesc>
            </ListContainer>
            <Button>
              <Visibility/>
              Afficher
            </Button>
          </ListItem>
        ))
        }
      </List>
    </Container>
  );
};

export default WidgetSm;