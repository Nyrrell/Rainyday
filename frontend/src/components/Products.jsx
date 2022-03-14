import styled from "styled-components";
import { useEffect, useState } from "react";

import Product from "./Product.jsx";
import productStore from "../store/productStore.js";
import media from "css-in-js-media";

const Container = styled.section`
  width: var(--container-size);
  margin: 0 auto 3rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  ${media("<=phone")} { width: 80% }
`;


const Products = ({ cat, filters, sort, limit }) => {
  // const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const { products, getProducts } = productStore();


  useEffect(() => {
    // const getProducts = async () => {
    //   try {
    //     // const { data } = await publicRequest.get(cat ? `products?category=${cat}` : "/products");
    //     // setProducts(data);
    //     setProducts(!limit ? popularProducts : popularProducts.slice(0, limit))
    //   } catch (e) {
    //   }
    // }
    getProducts();
  }, [/*cat, limit*/getProducts]);

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
          ? filteredProducts.map(item => <Product item={item} key={item['_id']}/>)
          : products.map(item => <Product item={item} key={item['_id']}/>)
      }
    </Container>
  );
};

export default Products;