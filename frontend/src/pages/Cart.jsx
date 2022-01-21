import StripeCheckout from "react-stripe-checkout";
import { Add, Remove } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { userRequest } from "../requestApi.js";
import { mobile } from "../responsive.js";

const KEY = process.env.REACT_APP_STRIPE;

const Wrapper = styled.div`
  width: var(--container-size);
  margin: 3rem auto;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 30px;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
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

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  padding-bottom: 5px;
  margin: 5px 0;
  border-bottom: 1px solid var(--color-light);
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 150px;
  border: 1px solid var(--color-gray);
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  border-bottom: 2px solid var(--color-yellow);
  transition: .3s;

  &:hover {
    border-bottom: 2px solid var(--color-light);
  }

  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props['color']};
`;

const ProductSize = styled.span`

`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: var(--color-yellow);
  margin-bottom: 20px;
  ${mobile({ marginBottom: "20px" })}
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
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const isEmpty = cart['products'] <= 0;

  const onToken = (token) => {
    setStripeToken(token)
  };

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

  return (
    <Wrapper>
      <Title>Panier</Title>
      <Top>
        <TopButton type="filled">Continuer tes achats</TopButton>
        <TopButton type="filled">Passer la commande</TopButton>
      </Top>
      <Bottom>
        <Info empty={isEmpty}>
          {!isEmpty
            ? cart['products'].map(product => (
              <Product>
                <ProductDetail>
                  <Link to={`/product/${product['_id']}`}><Image src={product['img']}/></Link>
                  <Details>
                    <ProductName>
                      <Link to={`/product/${product['_id']}`}>{product['title']}</Link>
                    </ProductName>
                    {product['color'] && <ProductColor color={product['color']}/>}
                    {product['size'] && <ProductSize><b>Taille : </b>{product['size']}</ProductSize>}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>{product['price'] * product['quantity']} €</ProductPrice>
                  <ProductAmountContainer>
                    <Add/>
                    <ProductAmount>{product['quantity']}</ProductAmount>
                    <Remove/>
                  </ProductAmountContainer>
                </PriceDetail>
              </Product>
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
          <StripeCheckout
            name={"Sticker Shop"} //TODO
            billingAddress
            shippingAddress
            description={`Prix total du panier ${cart.total}€`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}>
            <SummaryButton>PAYER MAINTENANT</SummaryButton>
          </StripeCheckout>
        </Summary>
      </Bottom>
    </Wrapper>
  );
};

export default Cart;