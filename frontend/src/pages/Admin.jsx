import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "../components/Admin/Sidebar.jsx";
import Navbar from "../components/Admin/Navbar.jsx";
import productStore from "../store/productStore.js";
import userStore from "../store/userStore.js";
import { useEffect } from "react";

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
  const { getProducts } = productStore();
  const { getUsers } = userStore();

  useEffect(() => {
    getUsers()
    getProducts()
  }, [getUsers, getProducts])

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