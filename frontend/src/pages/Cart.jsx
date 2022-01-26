import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import AmountProduct from "../components/AmountProduct";
import { removeProduct } from "../redux/cartRedux";
import { userRequest } from "../requestApi.js";
import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { mobile } from "../responsive.js";
import ProductCart from "../components/ProductCart";

const Wrapper = styled.div`
  width: var(--container-size);
  margin: 3rem auto;
  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 3rem;
  font-weight: 600;
  font-size: 1.4rem;

  &::before {
    content: '‹';
    margin-right: 1rem;
  }
`;

const ClearCart = styled.button`
  width: fit-content;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
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
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
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

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Empty = styled.div`
  font-size: 4rem;
  font-weight: 800;
  opacity: 0.4;
`;

const Cart = () => {
  const cart = useSelector(state => state['cart']);
  const stripeToken = null;
  const navigate = useNavigate();
  const isEmpty = !cart['products'];
  const dispatch = useDispatch();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate('/success', {
          replace: true, state: { // TODO
            data: res.data,
            products: cart
          }
        });
      } catch (e) {
      }
    }
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart, navigate])

  const handleDelete = (e, product) => {
    e.preventDefault();
    dispatch(removeProduct({ ...product }))
  };

  return (
    <Wrapper>
      <Top>
        <Title>Panier</Title>
        <BackToProduct to={`/products/`}>Continue tes achats</BackToProduct>
        <ClearCart>Vider le panier</ClearCart>
      </Top>
      <Bottom>
        <Info empty={isEmpty}>
          {!isEmpty
            ?
            cart['products'].map((product, key) => (
              <ProductCart key={key} product={product}/>
            ))
            : <Empty>Panier vide</Empty>
          }
        </Info>
        <Summary>
          <SummaryTitle>Résumé commande</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Sous-total</SummaryItemText>
            <SummaryItemPrice>{cart['total']} €</SummaryItemPrice>
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
            <SummaryItemPrice>{cart['total']} €</SummaryItemPrice>
          </SummaryItem>
          <SummaryButton>PAYER MAINTENANT</SummaryButton>
        </Summary>
      </Bottom>
    </Wrapper>
  );
};

export default Cart;