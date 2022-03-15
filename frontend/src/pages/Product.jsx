import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import media from "css-in-js-media";

import AmountProduct from "../components/AmountProduct";
import Products from "../components/Products";
import Image from "../components/Image.jsx";

import productStore from "../store/productStore.js";
import cartStore from "../store/cartStore.js";

const Container = styled.div`
  width: var(--container-size);
  margin: 3rem auto;

  ${media("<=phone")} {
    width: 100vw
  }
`;

const BackToProduct = styled(Link)`
  font-weight: 600;
  font-size: 1.4rem;

  &::before {
    content: '‹';
    margin-right: 1rem;
  }
`;

const Wrapper = styled.div`
  background: var(--color-dark-alt);
  background: linear-gradient(180deg, var(--color-dark-alt) 50%, var(--color-dark) 100%);
  padding: 40px;
  display: flex;
  border: 3px solid var(--color-gray);
  margin-top: 1rem;

  ${media("<=phone")} {
    padding: 10px;
    flex-direction: column;
    border: none;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Img = styled(Image)`
  width: 80%;
  object-fit: cover;
  border: 1px solid var(--color-gray);

  ${media("<=phone")} {
    height: 40vh
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;

  ${media("<=phone")} {
    padding: 10px
  }
`;

const Article = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
  rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) content-box no-repeat left bottom / 100% 100%;
  display: inline-flex;

  ${media("<=phone")} {
    font-size: 2rem
  }
`;

const Desc = styled.p`
  margin: 20px 0;
  font-size: 18px;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6rem;

  ${media("<=phone")} {
    width: 100%
  }
`;

const Btn = styled(Button)`
  transition: all 0.2s ease;
  border-radius: unset;
  cursor: ${props => props['cursor']};

  &:hover {
    ${props => !props['cursor'] && 'transform: scale(1.1)'}
  }
`;

const RecommendedContainer = styled.section`
  margin-top: 3rem;
`;

const Subtitle = styled.h2`
  display: inline-flex;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
  rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
`;

const Product = () => {
  const { products } = productStore();
  const { addProduct } = cartStore();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
  }, [location]);

  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p["_id"] === id) || {};

  const handleClick = (e) => {
    e.preventDefault();
    quantity > 0 && addProduct({ ...product, quantity });
  };

  const handleQuantity = (amount) => {
    setQuantity(amount);
  }

  return (
    <Container>
      <BackToProduct to={`/products/${product['category'] || ''}`}>Retour à la liste des articles</BackToProduct>
      <Wrapper>
        <ImgContainer>
          <Img src={process.env.REACT_APP_BACKEND_URL + product['img']}/>
        </ImgContainer>
        <InfoContainer>
          <Article>{product['title']}</Article>
          <Desc>{product['desc']}</Desc>
          <Price>{product['price']} €</Price>
          <AddContainer>
            {product['quantity'] > 0
              ? <>
                <AmountProduct setQuantity={handleQuantity} quantity={quantity}/>
                <Btn onClick={handleClick} variant={'outlined'}>Ajouter au panier</Btn>
              </>
              : <Btn variant={'outlined'} cursor={'not-allowed'} color={'error'}>Victime de son succes</Btn>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <RecommendedContainer>
        <Subtitle>Produits recommandés</Subtitle>
        <Products limit={4}/>
      </RecommendedContainer>
    </Container>
  );
};

export default Product;