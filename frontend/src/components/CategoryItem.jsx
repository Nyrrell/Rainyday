import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive.js";

const Category = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;

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

const CategoryItem = ({ item }) => {
  return (
    <Category>
      <Link to={`/products/${item['cat']}`}>
        {item['cat']}
      </Link>
    </Category>
  );
};

export default CategoryItem;