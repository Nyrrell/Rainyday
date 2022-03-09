import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "../components/Admin/Layout/Sidebar.jsx";
import Navbar from "../components/Admin/Layout/Navbar.jsx";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 6;
  padding: 20px;
  background: white;
  color: black;
`;

const Admin = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Sidebar/>
        <Content>
          <Outlet/>
        </Content>
      </Container>
    </>
  );
};

export default Admin;