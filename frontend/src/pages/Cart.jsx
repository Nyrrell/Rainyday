import StripeCheckout from "react-stripe-checkout";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Announcement from "../components/Announcement.jsx";
import { userRequest } from "../requestApi.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { mobile } from "../responsive.js";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
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

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  padding-bottom: 5px;
  margin: 5px 0;
  border-bottom: 1px solid lightgray;
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 150px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.span`

`;

const ProductId = styled.span`

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
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 5px 0;
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

const Cart = () => {
  const cart = useSelector(state => state['cart']);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

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
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <Title>Ton panier</Title>
        <Top>
          <TopButton>Continuer tes achats</TopButton>
          <TopTexts>
            <TopText>Panier (2)</TopText>
            <TopText>Liste de souhait (0)</TopText>
          </TopTexts>
          <TopButton type="filled">Passer la commande</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (
              <Product>
                <ProductDetail>
                  <Image
                    src={product['img']}/>
                  <Details>
                    <ProductName><b>Produit : </b>{product['title']}</ProductName>
                    <ProductId><b>Id : </b>{product['_id']}</ProductId>
                    {product['color'] && <ProductColor color={product['color']}/>}
                    {product['size'] && <ProductSize><b>Taille : </b>{product['size']}</ProductSize>}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add/>
                    <ProductAmount>{product['quantity']}</ProductAmount>
                    <Remove/>
                  </ProductAmountContainer>
                  <ProductPrice>{product['price'] * product['quantity']} €</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr/>
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
      <Footer/>
    </Container>
  );
};

export default Cart;