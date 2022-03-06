import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";

import AmountProduct from "../components/AmountProduct";
import { mobile } from "../services/responsive.js";
import Products from "../components/Products";
import cartStore from "../store/cartStore.js";
import { popularProducts } from "../data";

const Container = styled.div`
  width: var(--container-size);
  margin: 3rem auto;

  ${mobile({ width: "100vw" })}
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

  ${mobile({
    padding: "10px",
    flexDirection: "column",
    border: 'none'
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 80%;
  object-fit: cover;
  border: 1px solid var(--color-gray);

  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;

const Article = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
  rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) content-box no-repeat left bottom / 100% 100%;
  display: inline-flex;

  ${mobile({ fontSize: "2rem" })}
`;

const Desc = styled.p`
  margin: 20px 0;
  font-size: 18px;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props['color']};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
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
  const { addProduct } = cartStore();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        // const { data } = await publicRequest.get(`products/find/${id}`);
        // setProduct(data)
        setProduct(popularProducts[id - 1])
      } catch (e) {
      }
    }
    getProduct();
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    quantity > 0 && addProduct({ ...product, quantity, color, size });
  };

  const handleQuantity = (amount) => {
    setQuantity(amount);
  }

  return (
    <Container>
      <BackToProduct to={`/products/${product['cat'] || ''}`}>Retour à la liste des articles</BackToProduct>
      <Wrapper>
        <ImgContainer>
          <Image src={product['img']}/>
        </ImgContainer>
        <InfoContainer>
          <Article>{product['title']}</Article>
          <Desc>{product['desc']}</Desc>
          <Price>{product['price']} €</Price>
          <FilterContainer>
            {product['color'] > 0 &&
              <Filter>
                <FilterTitle>Couleur</FilterTitle>
                {product['color'].map(color => (<FilterColor color={color} key={color} onClick={setColor(color)}/>))}
              </Filter>
            }
            {product['size'] > 0 &&
              <Filter>
                <FilterTitle>Taille</FilterTitle>
                <FilterSize onChange={e => setSize(e.target.value)}>
                  {product['size'].map(size => (<FilterSizeOption key={size}>{size}</FilterSizeOption>))}
                </FilterSize>
              </Filter>
            }
          </FilterContainer>
          <AddContainer>
            {product['stock']
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