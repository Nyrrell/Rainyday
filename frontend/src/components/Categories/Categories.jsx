import styled from "styled-components";
import media from "css-in-js-media";

import CategoryItem from "./CategoryItem.jsx";
import categoryStore from "../../store/categoryStore.js";

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
  const { categories } = categoryStore();

  return (
    <Container>
      {categories.map(item => <CategoryItem item={item} key={item?.['_id']}/>)}
    </Container>
  );
};

export default Categories;