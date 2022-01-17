import React from 'react';

import Slider from "../components/Slider.jsx";
import Categories from "../components/Categories.jsx";
import Products from "../components/Products.jsx";
import Newsletter from "../components/Newsletter.jsx";

const Home = () => {
  return (
    <>
      <Slider/>
      <Categories/>
      <Products/>
      {/*<Newsletter/>*/}
    </>
  );
};

export default Home;