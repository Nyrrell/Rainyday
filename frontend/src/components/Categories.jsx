import styled from "styled-components";
import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.jsx";
import { mobile } from "../responsive.js";

const Container = styled.div`
  width: 75vw;
  margin: 0 auto;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: 0, flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map(item => (
        <CategoryItem item={item} key={item['id']}/>
      ))}
    </Container>
  );
};

export default Categories;