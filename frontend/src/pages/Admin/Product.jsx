import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ProductForm from "../../components/Admin/ProductForm.jsx";
import Chart from "../../components/Admin/Chart.jsx";
import { userRequest } from "../../requestApi.js";

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
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);


  return (
    <>
      <PageTitle>Edition Article</PageTitle>

      <ProductTop>
        <TopLeft>
          <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
        </TopLeft>
        <TopRight>
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
        </TopRight>
      </ProductTop>

      <ProductForm data={product} type={'update'}>
      </ProductForm>
    </>
  );
};

export default Product;