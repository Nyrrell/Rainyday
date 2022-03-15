import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "css-in-js-media";

import Image from "./Image.jsx";

const Hover = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  transition: all 0.2s ease;
`;

const Category = styled.article`
  border-top: 1px solid var(--color-gray);
  border-bottom: 1px solid var(--color-gray);
  position: relative;
  height: 75vh;

  ${media(">phone")} {
    flex: 1;
    min-height: 450px;
    border: 1px solid var(--color-gray);
    height: 45vh;
  }

  & > a {
    text-decoration: none;
    color: var(--color-light);
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &:hover button {
    color: var(--color-yellow);
    border-color: var(--color-yellow);
  }

  &:hover ${Hover} {
    opacity: 1;
  }
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  justify-content: space-between;
  z-index: 4;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: var(--color-light);
  text-shadow: 2px 2px var(--color-dark);
`;

const Button = styled.button`
  font-weight: 800;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 50%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--color-light);
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 10px 16px -12px var(--color-dark);
`;

const CategoryItem = ({ item }) => {
  return (
    <Category>
      <Link to={`/products/${item['title']}`}>
        <Img src={process.env.REACT_APP_BACKEND_URL + item['img']}/>
        <Hover/>
        <Info>
          <Title>{item['title']}</Title>
          <Button>voir</Button>
        </Info>
      </Link>
    </Category>
  );
};

export default CategoryItem;