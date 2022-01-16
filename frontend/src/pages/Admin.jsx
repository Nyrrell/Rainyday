import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "../components/Admin/Sidebar.jsx";
import Navbar from "../components/Admin/Navbar.jsx";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 6;
  padding: 20px;
`;

const Admin = () => {
  return (
    <div>
      <Navbar/>
      <Container>
        <Sidebar/>
        <Content>
          <Outlet/>
        </Content>
      </Container>
    </div>
  );
};

export default Admin;