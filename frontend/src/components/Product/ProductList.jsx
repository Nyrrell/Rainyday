import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import media from "css-in-js-media";

import ProductCard from "./ProductCard.jsx";

import productStore from "../../store/productStore.js";

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  ${media("<=phone")} {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductList = ({ cat, sort, limit }) => {
  const { products } = productStore();
  const { slug } = useParams();

  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    cat && setfilteredProducts(products.filter(item => item['category']['slug'] === cat));
  }, [products, cat]);

  useEffect(() => {
    if (sort === 'newest') {
      setfilteredProducts(prev => [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
    } else if (sort === 'asc') {
      setfilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setfilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort]);

  useEffect(() => {
    limit &&
    setfilteredProducts(products.filter(p => p['slug'] !== slug).sort(() => 0.5 - Math.random()).slice(0, limit))
  }, [limit, slug, products]);

  return (
    <Container>
      {filteredProducts
        ? filteredProducts.map(item => <ProductCard item={item} key={item['_id']}/>)
        : products.map(item => <ProductCard item={item} key={item['_id']}/>)
      }
    </Container>
  );
};

export default ProductList;