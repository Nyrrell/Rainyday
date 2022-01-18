import React from 'react';

import Slider from "../components/Slider.jsx";
import Categories from "../components/Categories.jsx";
import Products from "../components/Products.jsx";
import Newsletter from "../components/Newsletter.jsx";
import styled from "styled-components";

const Container = styled.div`
  background-color: var(--color-dark);
`;

const Home = () => {
  return (
    <Container>
      <Slider/>
      <Categories/>
      <Products/>
      {/*<Newsletter/>*/}
    </Container>
  );
};

export default Home;