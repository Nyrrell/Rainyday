import styled from "styled-components";
import media from "css-in-js-media";

import Categories from "../Categories/Categories.jsx";
import ProductList from "../Product/ProductList.jsx";
import Slider from "../Carousel/Slider.jsx";

const Title = styled.h2`
  width: var(--container-size);
  margin: 2rem auto;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  text-align: right;
  padding-right: 2rem;

  & > span {
    background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
    rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
  }

  ${media("<=phone")} {
    margin: 1rem auto;
    font-size: 1.4rem;
    text-align: center;
    padding-right: unset;
  }
`;

const Home = () => {
  return (
    <>
      <Slider/>
      <Title><span>Catégories</span></Title>
      <Categories/>
      <Title><span>Produits populaire</span></Title>
      <ProductList limit={12}/>
    </>
  );
};

export default Home;