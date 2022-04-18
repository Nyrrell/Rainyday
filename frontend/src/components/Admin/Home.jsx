import styled from "styled-components";
import { Card } from "@mui/material";
import {
  PermIdentity,
  Storefront,
  AttachMoney,
  Category,
  LocalOffer, KeyboardReturn
} from "@mui/icons-material";

import BaseTitle from "../Common/BaseTitle.jsx";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardCustom = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 400px;
  padding: 2rem;
  color: var(--color-light);
  background: var(--color-blue);
  gap: 1rem;
`;

const Element = ({ to, children }) => (
  <Link to={'/admin/' + to}>
    <CardCustom variant="outlined">
      {children}
    </CardCustom>
  </Link>
);

const Home = () => {
  return (
    <Container>
      <Element to={'sales'}>
        <AttachMoney fontSize={"large"}/>
        <BaseTitle>ventes</BaseTitle>
      </Element>
      <Element to={'users'}>
        <PermIdentity fontSize={'large'}/>
        <BaseTitle>utilisateurs</BaseTitle>
      </Element>
      <Element to={'categories'}>
        <Category fontSize={'large'}/>
        <BaseTitle>catégories</BaseTitle>
      </Element>
      <Element to={'products'}>
        <Storefront fontSize={'large'}/>
        <BaseTitle>produits</BaseTitle>
      </Element>
      <Element to={'discounts'}>
        <LocalOffer fontSize={'large'}/>
        <BaseTitle>code promo</BaseTitle>
      </Element>
      <Link to={'/'}>
        <CardCustom variant="outlined">
          <KeyboardReturn fontSize={'large'}/>
          <BaseTitle>retour shop</BaseTitle>
        </CardCustom>
      </Link>
    </Container>
  );
};

export default Home;