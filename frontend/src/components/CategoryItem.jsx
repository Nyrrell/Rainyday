import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive.js";

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

  & > a:hover {
    color: green;
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
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Category>
      <Link to={`/products/${item['cat']}`}>
        <Image src={item['img']}/>
        <Info>
          <Title>{item['cat']}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Category>
  );
};

export default CategoryItem;