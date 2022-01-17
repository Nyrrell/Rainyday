import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import {addProduct} from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  gap: 10px;

  & > a {
    border-radius: 50%;
    text-decoration: none;
    color: inherit;
  }
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  max-width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.2);

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 85%;
  height: 85%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 85%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
    const [quantity] = useState(1);
    const [product] = useState({});

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            addProduct({ ...product, quantity })
        );
    };

  return (
    <Container>
      <Circle/>
      <Image src={item['img']}/>
      <Info>
        <Icon onClick={handleClick}>
          <ShoppingCartOutlined/>
        </Icon>
          <Link to={`/product/${item['_id']}`}>
        <Icon>
            <SearchOutlined/>
        </Icon>
          </Link>
        {/*<Icon>*/}
        {/*  <FavoriteBorderOutlined/>*/}
        {/*</Icon>*/}
      </Info>
    </Container>
  );
};

export default Product;