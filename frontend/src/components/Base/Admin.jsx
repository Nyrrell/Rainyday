import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../Admin/Layout/Navbar.jsx";

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding-top: 1rem;
  flex-grow: 1;
  background: white;
  color: black;
  position: relative;
  outline: 10vw solid white;
`;

const Admin = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <Outlet/>
      </Container>
    </>
  );
};

export default Admin;