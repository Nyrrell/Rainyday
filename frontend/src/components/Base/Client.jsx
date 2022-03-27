import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import media from "css-in-js-media";
import { useEffect } from "react";

import Announcement from "../Layout/Announcement.jsx";
import Navbar from "../Layout/Navbar.jsx";
import Footer from "../Layout/Footer.jsx";

import categoryStore from "../../store/categoryStore.js";
import productStore from "../../store/productStore.js";

const Container = styled.div`
  width: var(--container-size);
  margin: 3rem auto;
  flex-grow: 1;

  &.auth {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${media("<=phone")} {
    width: 90vw;
  }
`;

const Client = () => {
  const { categories, getCategories } = categoryStore();
  const { products, getProducts } = productStore();
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(products).length) return;
    getProducts('public');
  }, [getProducts, products]);

  useEffect(() => {
    if (categories.length > 1) return;
    getCategories("public");
  }, [getCategories, categories]);

  return (
    <>
      <Navbar/>
      <Announcement/>
      <Container className={["/login", "/register"].includes(location.pathname) && "auth"}>
        <Outlet/>
      </Container>
      <Footer/>
    </>
  );
};

export default Client;