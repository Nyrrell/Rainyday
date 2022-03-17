import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "css-in-js-media";

import ProductDetailSkeleton from "./ProductDetailSkeleton.jsx";
import ProductDetail from "./ProductDetail.jsx";
import ProductList from "../Product/ProductList.jsx";

import productStore from "../../store/productStore.js";

const BackToProduct = styled(Link)`
  font-weight: 600;
  font-size: 1.4rem;

  &::before {
    content: '‹';
    margin-right: 1rem;
    transition: 0.3s;
  }

  &:hover {
    &::before {
      color: var(--color-yellow);
    }
  }
`;

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  border-top: 2px solid var(--color-gray);
  border-bottom: 2px solid var(--color-gray);
  margin-top: 1rem;

  ${media("<=phone")} {
    padding: 10px;
    flex-direction: column;
    border: none;
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

const ProductDetailPage = () => {
  const { products } = productStore();
  const { slug } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    Object.keys(products).length && setProduct(products.find(p => p["slug"] === slug) || {})
  }, [slug, products])

  const isExist = Boolean(Object.keys(product).length);

  return ( // TODO VERIFER MAUVAISE URL
    <>
      <BackToProduct to={isExist ? `/products/${product['category']}` : "/"}>Retour à la liste des
        articles</BackToProduct>
      <Wrapper>
        {isExist
          ? <ProductDetail product={product}/>
          : <ProductDetailSkeleton/>
        }
      </Wrapper>
      <RecommendedContainer>
        <Subtitle>Produits recommandés</Subtitle>
        <ProductList limit={4}/>
      </RecommendedContainer>
    </>
  )
};

export default ProductDetailPage;