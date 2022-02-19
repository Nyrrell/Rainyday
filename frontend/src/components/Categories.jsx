import styled from "styled-components";

import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.jsx";
import { mobile } from "../responsive.js";

const Container = styled.section`
  width: var(--container-size);
  height: 50vh;
  min-height: 400px;
  margin: 1.2rem auto;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  
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