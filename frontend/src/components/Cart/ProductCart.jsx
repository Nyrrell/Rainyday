import { Alert, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Clear } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

import cartStore from "../../store/cartStore.js";
import AmountProduct from "../AmountProduct.jsx";
import media from "css-in-js-media";
import productStore from "../../store/productStore.js";

const ProductCard = styled.div`
  display: flex;
  padding: 0.5rem 0;
  margin: 0.4rem 0;
  border-bottom: 0.1rem solid var(--color-gray);

  ${media("<=phone")} {
    flex-direction: column
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
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
    color: var(--color-yellow);
  }
`;

const AlertQuantity = styled(Alert)`
  color: var(--color-light);
`;

const PriceDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const InitialPrice = styled(Tooltip)``;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: var(--color-yellow);
  cursor: help;
`;

const ProductCart = ({ data, error }) => {
  const { updateProduct, removeProduct } = cartStore();
  const { products } = productStore();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(data['quantity']);

  useEffect(() => {
    Object.keys(products).length && setProduct(products.find(p => p["_id"] === data['_id']));
  }, [products, data])

  const handleQuantity = (amount) => {
    setQuantity(amount)
    updateProduct({ ...product, quantity: amount });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    removeProduct({ ...product, quantity: quantity });
  };

  const ShowAlert = () => {
    return error['quantity'] > 1
      ? <AlertQuantity variant="outlined" severity={'warning'}>{`${error['quantity']} article${error['quantity'] > 1 && 's'} disponible seulement`}</AlertQuantity>
      : <AlertQuantity variant="outlined" severity={'error'}>{'Cet article n\'est plus en stock'}</AlertQuantity>
  }

  if (!Object.keys(product).length) return null;

  return (
    <ProductCard>
      <Link to={`/product/${product['slug']}`}><Image src={process.env.REACT_APP_BACKEND_URL + product['img']}/></Link>
      <Details>
        <DeleteProduct color={"error"} size={'small'} onClick={handleDelete}><Clear/></DeleteProduct>
        <ProductDetail>
          <ProductName to={`/product/${product['slug']}`}>{product['title']}</ProductName>
        </ProductDetail>
        <PriceDetail>
          <AmountProduct size={'small'} quantity={quantity} setQuantity={handleQuantity}/>
          {error && <ShowAlert/>}
          <InitialPrice title={`Prix unitaire ${product['price']} €`} placement="left" arrow>
            <ProductPrice>{product['price'] * quantity} €</ProductPrice>
          </InitialPrice>
        </PriceDetail>
      </Details>
    </ProductCard>
  );
};

export default ProductCart;