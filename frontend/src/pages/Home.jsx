import React from 'react';

import Slider from "../components/Slider.jsx";
import Categories from "../components/Categories.jsx";
import Products from "../components/Products.jsx";
import Newsletter from "../components/Newsletter.jsx";
import styled from "styled-components";

const Title = styled.h2`
  width: var(--container-size);
  margin: 2rem auto;
  font-size: 30px;
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  
 & > span {
   background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
   rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
 }
`;

const Home = () => {
  return (
    <>
      <Slider/>
      <Title><span>Catégorie</span></Title>
      <Categories/>
      <Title><span>Produits populaire</span></Title>
      <Products/>
      {/*<Newsletter/>*/}
    </>
  );
};

export default Home;