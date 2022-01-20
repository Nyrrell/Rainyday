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
  padding: 10px;
  color: var(--color-light);
  font-size: 20px;
  font-weight: 800;
  border: 2px solid rgba(255,255,255,0.2);
  min-width: 10vw;
  min-height: 10vh;
  text-transform: uppercase;
  background-color: rgba(0,0,0,0.3);
  cursor: pointer;
`;

const Slider = () => {
  return (
    <>
      <Carousel>
        {popularProducts.map(item => (
          <Article>
            <Image src={item['img']} key={item['id']}/>
            <Button>{item['title']}</Button>
          </Article>
        ))}
      </Carousel>
    </>
  );
};

export default Slider;