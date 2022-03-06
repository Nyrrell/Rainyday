import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import Products from "../components/Products.jsx";
import { mobile } from "../services/responsive.js";

const Container = styled.div`
  width: var(--container-size);
  margin: 3rem auto;
`;

const Title = styled.h1`
  margin-left: 1.6rem;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  display: inline-flex;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
  rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 1.6rem;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin-right: 20px;
  ${mobile({ marginRight: 0 })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = ({ target }) => {
    setFilters({
      ...filters,
      [target.name]: target.value.toLowerCase()
    })
  };

  return (
    <Container>
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrer :</FilterText>
          <Select name="style" onChange={handleFilters}>
            <Option disabled>Style</Option>
            <Option>Normal</Option>
            <Option>Mat</Option>
            <Option>Foil</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Trier :</FilterText>
          <Select onChange={({ target }) => setSort(target.value)}>
            <Option value={"newest"}>Nouveau</Option>
            <Option value={"asc"}>Prix croissant</Option>
            <Option value={"desc"}>Prix décroissant</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} filters={filters} sort={sort}/>
    </Container>
  );
};

export default ProductList;