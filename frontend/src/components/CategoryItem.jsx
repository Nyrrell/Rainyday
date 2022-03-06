import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../services/responsive.js";

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
  flex: 1;
  border: 1px solid var(--color-gray);
  position: relative;

  & > a {
    text-decoration: none;
    color: var(--color-light);
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &:hover button{
    color: var(--color-yellow);
    border-color: var(--color-yellow);
  }

  &:hover ${Hover} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })}
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

const Title = styled.h2`
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
      <Link to={`/products/${item['cat']}`}>
        <Image src={item['img']}/>
        <Hover/>
        <Info>
          <Title>{item['cat']}</Title>
          <Button>voir</Button>
        </Info>
      </Link>
    </Category>
  );
};

export default CategoryItem;