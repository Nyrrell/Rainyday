import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "../components/Admin/Sidebar.jsx";
import Navbar from "../components/Admin/Navbar.jsx";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Admin = () => {
  return (
    <div>
      <Navbar/>
      <Container>
        <Sidebar/>
        <Outlet />
      </Container>
    </div>
  );
};

export default Admin;