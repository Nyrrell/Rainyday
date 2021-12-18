import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Announcement from "../components/Announcement.jsx";
import Products from "../components/Products.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import { mobile } from "../responsive.js";


const Container = styled.div`

`;

const Title = styled.h1`
  margin: 20px;
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
  ${mobile({ marginRight: 0})}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })}
`;

const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Title>Sticker</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrer :</FilterText>
          <Select>
            <Option disabled selected>Style</Option>
            <Option>Shiny</Option>
            <Option>Mat</Option>
            <Option>Brillant</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Trier :</FilterText>
          <Select>
            <Option selected>Nouveau</Option>
            <Option>Prix croissant</Option>
            <Option>Prix décroissant</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products/>
      <Newsletter/>
      <Footer/>
    </Container>
  );
};

export default ProductList;