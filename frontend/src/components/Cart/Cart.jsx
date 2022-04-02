import { Link, useLocation } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import styled from "styled-components";
import media from "css-in-js-media";
import { useEffect } from "react";

import PaypalCheckout from "./PaypalCheckout.jsx";
import BaseTitle from "../Common/BaseTitle.jsx";
import ProductCart from "./ProductCart.jsx";

import checkoutStore from "../../store/checkoutStore.js";
import cartStore from "../../store/cartStore.js";
import authStore from "../../store/authStore.js";

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 0.5rem 0;
`;

const Title = styled(BaseTitle)`
  margin-left: 1.6rem;
  display: inline-flex;
`;

const BackToProduct = styled(Link)`
  width: fit-content;
  font-weight: 600;
  font-size: 1.4rem;

  &::before {
    content: '‹';
    margin-right: 1rem;
  }
`;

const ClearCart = styled(Button)``;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${media("<=phone")} {
    flex-direction: column
  }
`;

const ProductList = styled.div`
  flex: 3;
  margin-right: 1rem;

  ${({ empty }) => empty && {
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  }}
`;

const AlertFeedback = styled(Alert)`
  color: var(--color-light);
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid var(--color-gray);
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-weight: 200;
  text-transform: uppercase;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props['type'] === "total" && 500};
  font-size: ${props => props['type'] === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Empty = styled.div`
  display: ${props => props['approve'] && "none"};
  font-size: 4rem;
  font-weight: 800;
  opacity: 0.4;
`;

const Cart = () => {
  const { products, total, emptyProduct } = cartStore();
  const { notAvailable, error } = checkoutStore();
  const { token } = authStore();
  const location = useLocation();
  const approve = location.state?.approve;

  useEffect(() => {
    if (approve) emptyProduct();
  }, [approve, emptyProduct])

  const handleClick = (e) => {
    e.preventDefault();
    emptyProduct();
  };

  const isEmpty = !products.length;
  return (
    <>
      <Title>Panier</Title>
      <Top>
        <BackToProduct to={'/'}>Continue tes achats</BackToProduct>
        {!isEmpty &&
          <ClearCart variant={'outlined'} color={'error'} startIcon={<Delete/>} onClick={handleClick}>Vider le
            panier</ClearCart>}

      </Top>
      <Bottom>
        <ProductList empty={isEmpty}>
          {approve && <AlertFeedback variant={'outlined'} severity={"success"}>Commande validé, merci pour votre achat.</AlertFeedback>}
          {error && <AlertFeedback variant={'outlined'} severity={"error"}>Désolé, votre transaction n'a pas pu être traitée.</AlertFeedback>}
          {!isEmpty
            ?
            products.map((product, key) => (
              <ProductCart key={key} data={product} error={notAvailable && notAvailable.find(o => o['_id'] === product['_id'] )}/>
            ))
            : <Empty approve={approve}>Panier vide</Empty>
          }
        </ProductList>
        <Summary>
          <SummaryTitle>Résumé commande</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Sous-total</SummaryItemText>
            <SummaryItemPrice>{total} €</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Frais de port</SummaryItemText>
            <SummaryItemPrice>5,90 €</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Code promo</SummaryItemText> {/*TODO CODE PROMO*/}
            <SummaryItemPrice>-5,90 €</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type={"total"}>
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>{total} €</SummaryItemPrice>
          </SummaryItem>
          { token
            ? <PaypalCheckout products={products}/>
            : <Link to={"/login"} state={{ from: location }}><Button variant={'outlined'} fullWidth>Connectez vous</Button></Link>
          }
        </Summary>
      </Bottom>
    </>
  );
};

export default Cart;