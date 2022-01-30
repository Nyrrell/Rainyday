import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { removeProduct, updateProduct } from "../reducers/cartReducer.js";
import AmountProduct from "./AmountProduct";
import { mobile } from "../responsive";
import { useState } from "react";

const ProductCard = styled.div`
  display: flex;
  width: 95%;
  padding-bottom: 5px;
  margin: 5px 0;
  border-bottom: 1px solid var(--color-gray);
  ${mobile({ flexDirection: "column" })};
`;

const Image = styled.img`
  width: 150px;
  border: 1px solid var(--color-gray);
`;

const DeleteProduct = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease-in;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`;

const ProductDetail = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled(Link)`
  width: fit-content;
  font-weight: 600;
  font-size: 1.4rem;
  border-bottom: 2px solid var(--color-yellow);
  transition: .3s;

  &:hover {
    border-bottom: 2px solid var(--color-light);
  }
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props['color']};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: var(--color-yellow);
`;

const ProductCart = ({ product }) => {
  const [item, setItem] = useState(product)
  const dispatch = useDispatch();

  const handleQuantity = (amount) => {
    setItem({ ...item, quantity: amount })
    dispatch(updateProduct({ ...item, quantity: amount }))
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeProduct({ ...item }))
  };

  return (
    <ProductCard>
      <Link to={`/product/${item['_id']}`}><Image src={item['img']}/></Link>
      <Details>
        <DeleteProduct color={"error"} size={'small'}
                       onClick={handleDelete}><Clear/></DeleteProduct>
        <ProductDetail>
          <ProductName to={`/product/${item['_id']}`}>{item['title']}</ProductName>
          {item['color'] && <ProductColor color={item['color']}/>}
          {item['size'] && <ProductSize><b>Taille : </b>{item['size']}</ProductSize>}
        </ProductDetail>
        <PriceDetail>
          <AmountProduct size={'small'} quantity={item['quantity']} setQuantity={handleQuantity}/>
          <ProductPrice>{item['price'] * item['quantity']} €</ProductPrice>
        </PriceDetail>
      </Details>
    </ProductCard>
  );
};

export default ProductCart;