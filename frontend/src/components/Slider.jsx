import { Link } from "react-router-dom";
import styled from "styled-components";

import { popularProducts } from "../data.js";
import Carousel from "./Carousel.jsx";


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
  return (
    <>
      <Carousel>
        {popularProducts.map(item => (
          <Article>
            <Image src={item['img']} key={item['_id']}/>
            <Link to={`/product/${item['_id']}`}>
              <Button>{item['title']}</Button>
            </Link>
          </Article>
        ))}
      </Carousel>
    </>
  );
};

export default Slider;