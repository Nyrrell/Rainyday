import { Link } from "react-router-dom";
import styled from "styled-components";

import Carousel from "./Carousel.jsx";
import productStore from "../../store/productStore.js";
import { useEffect, useState } from "react";

const Article = styled.article`
  display: inline-flex;
  position: relative;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: left;
`;

const Button = styled.button`
  position: absolute;
  top: 50px;
  left: 100px;
  padding: 20px;
  color: var(--color-light);
  font-size: 1.2rem;
  font-weight: 800;
  border: 2px solid rgba(255, 255, 255, 0.3);
  min-width: 5vw;
  min-height: 5vh;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 10px 16px -12px var(--color-dark);
  
  &:hover{
    color: var(--color-yellow);
    border-color: var(--color-yellow);
  }
`;

const Slider = () => {
  const { products } = productStore();
  const [productSlider, setProductSlider] = useState([]);

  useEffect(() => {
    if (!products.length) return;
    setProductSlider(products.sort(() => 0.5 - Math.random()).slice(0, 6)) // TODO FROM ADMIN
  }, [products])

  return (
    <>
      <Carousel>
        {productSlider.map(item => (
          <Article key={item['_id']}>
            <Image src={process.env.REACT_APP_BACKEND_URL + item['img']}/>
            <Link to={`/product/${item['slug']}`}>
              <Button>{item['title']}</Button>
            </Link>
          </Article>
        ))}
      </Carousel>
    </>
  );
};

export default Slider;