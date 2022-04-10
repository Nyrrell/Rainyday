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

  // CUSTOM INPUT 
  & .MuiOutlinedInput-root {
    background: var(--color-gray);
  }
  & .MuiInputBase-input, .MuiInputLabel-outlined, .MuiFormHelperText-sizeMedium:not(.Mui-error) {
    color: var(--color-light);
  }
  & .Mui-disabled {
    -webkit-text-fill-color: inherit;
    opacity: 0.7;
  }
  & .show-password {
    color: var(--color-light);
  }
  
  ${media("<=phone")} {
    width: 90vw;
  }
`;

const Client = () => {
  const { getCategories } = categoryStore();
  const { getProducts } = productStore();
  const location = useLocation();

  useEffect(() => {
    getProducts('public');
  }, [getProducts]);

  useEffect(() => {
    getCategories("public");
  }, [getCategories]);

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