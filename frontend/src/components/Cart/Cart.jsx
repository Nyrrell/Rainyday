import { Delete } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import media from "css-in-js-media";

import PaypalCheckout from "./PaypalCheckout.jsx";
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

const Title = styled.h1`
  margin-left: 1.6rem;
  width: fit-content;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  display: inline-flex;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
  background: linear-gradient(to top, transparent 10%, rgba(240, 165, 0, 0.8) 10.01%,
  rgba(240, 165, 0, 0.8) 40%, transparent 40.01%) no-repeat left bottom / 100% 100%;
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

const Info = styled.div`
  flex: 3;

  ${({ empty }) => empty && {
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  }}
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
  font-size: 4rem;
  font-weight: 800;
  opacity: 0.4;
`;

const Cart = () => {
  const location = useLocation();

  const { products, total, emptyProduct } = cartStore();
  const { errorOrder } = checkoutStore();
  const { token } = authStore();

  const isEmpty = !products.length;

  const handleClick = (e) => {
    e.preventDefault();
    emptyProduct();
  };

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
        <Info empty={isEmpty}>
          {!isEmpty
            ?
            products.map((product, key) => (
              <ProductCart key={key} data={product} error={errorOrder && errorOrder.find(o => o['_id'] === product['_id'] )}/>
            ))
            : <Empty>Panier vide</Empty>
          }
        </Info>
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
            <SummaryItemText>Code promo</SummaryItemText>
            <SummaryItemPrice>-5,90 €</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type={"total"}>
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>{total} €</SummaryItemPrice>
          </SummaryItem>
          {token
            ? <PaypalCheckout products={products}/>
            : <Link to={"/login"} state={{ from: location }}><Button variant={'outlined'} fullWidth>Connectez vous</Button></Link>
          }
        </Summary>
      </Bottom>
    </>
  );
};

export default Cart;