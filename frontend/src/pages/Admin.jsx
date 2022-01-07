import styled from "styled-components";

import Sidebar from "../components/Admin/Sidebar.jsx";
import Navbar from "../components/Admin/Navbar.jsx";
import Home from "./Admin/Home.jsx";

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
        <Home/>
      </Container>
    </div>
  );
};

export default Admin;