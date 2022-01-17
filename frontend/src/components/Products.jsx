import styled from "styled-components";
import { useEffect, useState } from "react";

import { publicRequest } from "../requestApi.js";
import Product from "./Product.jsx";

const Container = styled.div`
  width: 75vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;


const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await publicRequest.get(cat ? `products?category=${cat}` : "/products");
        setProducts(data);
      } catch (e) {
      }
    }
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat && setfilteredProducts(
      products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    )
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setfilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setfilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setfilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {
        cat
          ? filteredProducts.map(item => <Product item={item} key={item['id']}/>)
          : products.map(item => <Product item={item} key={item['id']}/>)
      }
    </Container>
  );
};

export default Products;