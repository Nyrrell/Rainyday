import { useParams } from "react-router-dom";
import styled from "styled-components";
import media from "css-in-js-media";
import { useState } from "react";

import ProductList from "./ProductList.jsx";
import BaseTitle from "../Common/BaseTitle.jsx";

const CatContainer = styled.div`
  margin: 0 1.6rem 1.6rem 1.6rem; 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(BaseTitle)``;

const Filter = styled.div`
  ${media("<=phone")} {
    margin: 0 20px;
    display: flex;
    flex-direction: column
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin-right: 20px;

  ${media("<=phone")} {
    margin-right: 0
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;

  ${media("<=phone")} {
    margin: 10px 0
  }
`;

const Option = styled.option``;

const ProductCatalog = () => {
  const { category } = useParams();

  const [sort, setSort] = useState("newest"); // TODO RESET CHANGEMENT PAGE

  return (
    <>
      <CatContainer>
        <Title>{category}</Title>
        <Filter>
          <FilterText>Trier :</FilterText>
          <Select onChange={({ target }) => setSort(target.value)}>
            <Option value={"newest"}>Nouveau</Option>
            <Option value={"asc"}>Prix croissant</Option>
            <Option value={"desc"}>Prix décroissant</Option>
          </Select>
        </Filter>
      </CatContainer>
      <ProductList cat={category} sort={sort}/>
    </>
  );
};

export default ProductCatalog;