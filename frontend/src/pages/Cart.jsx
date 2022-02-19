import { Link, useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useEffect } from "react";

import PaypalCheckout from "../components/PaypalCheckout.jsx";
import ProductCart from "../components/ProductCart";
import { userRequest } from "../requestApi.js";
import cartStore from "../store/cartStore.js";
import { mobile } from "../responsive.js";

const Wrapper = styled.div`
  width: var(--container-size);
  min-height: 60vh;
  margin: 3rem auto;
  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0 0.5rem 0;
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

const ClearCart = styled(Button)`
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
  border: 0.5px solid var(--color-gray);
  border-radius: 10px;
  padding: 20px;
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
  const { products, total, emptyProduct } = cartStore();
  const stripeToken = null;
  const navigate = useNavigate();
  const isEmpty = !products.length;


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('checkout/payment', {
          tokenId: stripeToken.id,
          amount: total * 100,
        });
        navigate('/success', {
          replace: true, state: { // TODO
            data: res.data,
            products: products
          }
        });
      } catch (e) {
      }
    }
    stripeToken && total >= 1 && makeRequest();
  }, [stripeToken, products, total, navigate])

  const handleClick = (e) => {
    e.preventDefault();
    emptyProduct();
  };

  return (
    <Wrapper>
      <Title>Panier</Title>
      <Top>
        <BackToProduct to={`/products/`}>Continue tes achats</BackToProduct>
        {!isEmpty && <ClearCart variant={'outlined'} color={'error'} startIcon={<Delete/>} onClick={handleClick}>Vider le panier</ClearCart>}
      </Top>
      <Bottom>
        <Info empty={isEmpty}>
          {!isEmpty
            ?
            products.map((product, key) => (
              <ProductCart key={key} product={product}/>
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
          <PaypalCheckout products={products} total={total}/>
        </Summary>
      </Bottom>
    </Wrapper>
  );
};

export default Cart;