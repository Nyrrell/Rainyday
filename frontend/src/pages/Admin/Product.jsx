import ProductForm from "../../components/Admin/ProductForm.jsx";
import { productData, productRows } from "../../data.js";
import Chart from "../../components/Admin/Chart.jsx";
import styled from "styled-components";

const PageTitle = styled.h1``;

const ProductTop = styled.div`
  display: flex
`;

const TopLeft = styled.div`
  flex: 2;
`;

const TopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  return (
    <>
      <PageTitle>Edition Article</PageTitle>

      <ProductTop>
        <TopLeft>
          <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
        </TopLeft>
        <TopRight>
          <ProductInfoTop>
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="" className="productInfoImg"/>
            <ProductName>Apple Airpods</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <ProductInfoKey>ID :</ProductInfoKey>
              <ProductInfoValue>123</ProductInfoValue>
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
              <ProductInfoValue>Non</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </TopRight>
      </ProductTop>

      <ProductForm data={productRows[0]} >

      </ProductForm>
    </>
  );
};

export default Product;