import { Button } from "@mui/material";
import styled from "styled-components";
import media from "css-in-js-media";
import { useState } from 'react';

import AmountProduct from "../Common/AmountProduct.jsx";
import BaseTitle from "../Common/BaseTitle.jsx";
import Image from "../Common/Image.jsx";

import cartStore from "../../store/cartStore.js";

const ImgContainer = styled.div`
  flex: 1;
  max-height: 400px;
  max-width: 400px;
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--color-gray);

  ${media("<=phone")} {
    height: 40vh
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  ${media("<=phone")} {
    padding: 10px
  }
`;

const ArticleTitle = styled(BaseTitle)`
  font-size: 3rem;

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

const ProductDetail = ({ product }) => {
  const { addProduct } = cartStore();

  const [quantity, setQuantity] = useState(1);

  const handleClick = (e) => {
    e.preventDefault();
    quantity > 0 && addProduct({ ...product, quantity });
  };

  const handleQuantity = (amount) => {
    setQuantity(amount);
  }

  return (
    <>
      <ImgContainer>
        <Img src={process.env.REACT_APP_BACKEND_URL + product['img']}/>
      </ImgContainer>
      <InfoContainer>
        <ArticleTitle>{product['title']}</ArticleTitle>
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
    </>
  );
};

export default ProductDetail;