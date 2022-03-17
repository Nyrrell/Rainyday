import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import Image from "../Image.jsx";

const Hover = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  transition: all 0.2s ease;
`;

const Container = styled.article`
  width: 300px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--color-dark);
  background: linear-gradient(180deg, var(--color-dark-alt) 50%, var(--color-dark) 100%);
  box-shadow: 0 5px 16px -12px rgba(255, 255, 255, 0.5);
  border: 1px solid var(--color-gray);

  &:hover ${Hover} {
    opacity: 1;
  }
`;

const ImageContainer = styled(Link)`
  position: relative;
  color: inherit;
  text-decoration: none;
  height: 300px;
  width: 100%;
  border-bottom: 1px solid var(--color-gray);
`;

const Img = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const SoldOut = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 4;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-light);
  text-align: right;
  line-height: 0.9em;
  text-shadow: 2px 2px var(--color-dark);
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  padding: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-light);
  text-transform: uppercase;
`;

const Price = styled.p`
  padding: 20px;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-light);
`;

const Btn = styled(Button)`
  transition: all 0.2s ease;
  border-radius: unset;
  cursor: ${props => props['cursor']};

  &:hover {
    ${props => !props['cursor'] && 'transform: scale(1.1)'}
  }
`;

const ProductCard = ({ item }) => {
  const location = useLocation();
  const state = { from: location['pathname'] }

  const inStock = item['quantity'] > 0;

  return (
    <Container>
      <ImageContainer state={state} to={`/product/${item['slug']}`}>
        {!inStock && <SoldOut>SOLD <br/>OUT</SoldOut>}
        <Img src={process.env.REACT_APP_BACKEND_URL + item['img']}/>
        <Hover/>
      </ImageContainer>

      <Info>
        <Title>{item['title']}</Title>
        <Price>{item['price']} €</Price>
      </Info>
      <Link state={state} to={`/product/${item['slug']}`}>
        {inStock
          ? <Btn variant="outlined">commander</Btn>
          : <Btn cursor={'not-allowed'} color={'error'} variant="outlined">victime de son succes</Btn>}
      </Link>
    </Container>
  );
};

export default ProductCard;