import styled from "styled-components";

import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.jsx";
import { mobile } from "../responsive.js";

const Container = styled.ul`
  width: 65vw;
  height: 3rem;
  margin: 20px auto;
  display: flex;
  background: var(--color-blue);
  border: 1px solid var(--color-gray);
  padding: 0;
  list-style: none;
  
  ${mobile({ padding: 0, flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map(item => <CategoryItem item={item} key={item['id']}/>)}
    </Container>
  );
};

export default Categories;