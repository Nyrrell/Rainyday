import styled from "styled-components";

import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.jsx";
import media from "css-in-js-media";

const Container = styled.section`
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  margin: 1.2rem auto;
  
  ${media(">phone")} {
    width: var(--container-size);
    margin: 1.2rem auto;
    flex-direction: row;
  }
`;

const Categories = () => {
  return (
    <Container>
      {categories.map(item => <CategoryItem item={item} key={item['id']}/>)}
    </Container>
  );
};

export default Categories;