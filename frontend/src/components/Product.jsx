import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 300px;
  max-width: 300px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--color-dark);
  background: linear-gradient(190deg, var(--color-dark-alt) 0%, var(--color-dark) 100%);
  border: 1px solid var(--color-gray);

  &:hover ${Hover} {
    opacity: 1;
  }

`;

const ImageContainer = styled(Link)`
  position: relative;
  color: inherit;
  text-decoration: none;
`;

const Image = styled.img`
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

const Product = ({ item }) => {
  return (
    <Container>
      <ImageContainer to={`/product/${item['_id']}`}>
        {!item['stock'] && <SoldOut>SOLD <br />OUT</SoldOut>}
        <Image src={item['img']}/>
        <Hover/>
      </ImageContainer>

      <Info>
        <Title>{item['title']}</Title>
        <Price>{item['price']} €</Price>
      </Info>
      {item['stock']
        ? <Btn href={`/product/${item['_id']}`} variant="outlined">commander</Btn>
        : <Btn href={`/product/${item['_id']}`} cursor={'not-allowed'} color={'error'} variant="outlined">victime de son
          succes</Btn>}
    </Container>
  );
};

export default Product;