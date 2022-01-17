import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

import { addProduct } from "../redux/cartRedux.js";
import { publicRequest } from "../requestApi.js";
import { useEffect, useState } from "react";
import { mobile } from "../responsive.js";

const Container = styled.div`
  width: 75vw;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await publicRequest.get(`products/find/${id}`);
        setProduct(data)
      } catch (e) {
      }
    }
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image
            src={product['img']}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{product['title']}</Title>
          <Desc>{product['desc']}</Desc>
          <Price>5€</Price>
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
            <AmountContainer>
              <Remove cursor={"pointer"} onClick={() => handleQuantity('dec')}/>
              <Amount>{quantity}</Amount>
              <Add cursor={"pointer"} onClick={() => handleQuantity('inc')}/>
            </AmountContainer>
            <Button onClick={handleClick}>Ajouter au panier</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;