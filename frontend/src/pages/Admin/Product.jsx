import { useLocation } from "react-router-dom";
import styled from "styled-components";

import ProductForm from "../../components/Admin/ProductForm.jsx";
import productStore from "../../store/productStore.js";

const PageTitle = styled.h1``;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-left: 20px;
  padding: 20px 40px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
`;

const ProductName = styled.span`
  font-weight: 600;
`;

const ProductInfoBottom = styled.div`
  margin-top: 20px;
`;

const ProductInfoItem = styled.div`
  width: 80%;
  margin-bottom: 1vw;
  display: flex;
  justify-content: space-between;
`;

const ProductInfoKey = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const ProductInfoValue = styled.span`
  font-weight: 300;
`;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const { products, deleteProduct } = productStore();

  const product = products.find((product) => product._id === productId);

  return (
    <>
      <PageTitle>Edition Article</PageTitle>
      <ProductContainer>
        <ProductForm data={product} type={'update'}/>
        <ProductInfo>
          <ProductInfoTop>
            <img src={product['img']} alt=""/>
            <ProductName>{product['title']}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <ProductInfoKey>ID :</ProductInfoKey>
              <ProductInfoValue>{product['_id']}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Ventes :</ProductInfoKey>
              <ProductInfoValue>5123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>Disponible :</ProductInfoKey>
              <ProductInfoValue>Oui</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>En Stock :</ProductInfoKey>
              <ProductInfoValue>{product['inStock']}</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductInfo>
      </ProductContainer>
    </>
  );
};

export default Product;