import styled from "styled-components";

import Categories from "../Categories/Categories.jsx";
import ProductList from "../Product/ProductList.jsx";
import Slider from "../Carousel/Slider.jsx";
import BaseTitle from "../Common/BaseTitle.jsx";


const TitleContainer = styled.div`
  width: var(--container-size);
  margin: 3rem auto;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 2rem;
`;

const Title = styled(BaseTitle)`
  font-size: 2.8rem;
`;

const Home = () => {
  return (
    <>
      <Slider/>
      <TitleContainer>
        <Title forwardedAs={'h2'}>Catégories</Title>
      </TitleContainer>
      <Categories/>
      <TitleContainer>
        <Title forwardedAs={'h2'}>Produits populaire</Title>
      </TitleContainer>
      <ProductList limit={12}/>
    </>
  );
};

export default Home;