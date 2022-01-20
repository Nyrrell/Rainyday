import styled from "styled-components";
import Products from "../components/Products.jsx";
import { mobile } from "../responsive.js";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  width: var(--container-size);
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 20px;
  text-transform: uppercase;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
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
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value.toLowerCase()
    })
  };

  return (
    <Container>
      <Title>{cat}</Title>
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
          <Select onChange={e => setSort(e.target.value)}>
            <Option value={"newest"}>Nouveau</Option>
            <Option value={"asc"}>Prix croissant</Option>
            <Option value={"desc"}>Prix décroissant</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
    </Container>
  );
};

export default ProductList;