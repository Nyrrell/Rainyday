import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { userRequest } from "../requestApi.js";
import { mobile } from "../responsive.js";
import AmountProduct from "../components/AmountProduct";
import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";

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
  margin-top: 3rem;
  font-weight: 600;
  font-size: 1.4rem;

  &::before {
    content: '‹';
    margin-right: 1rem;
  }
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

const ProductCard = styled.div`
  display: flex;
  width: 95%;
  padding-bottom: 5px;
  margin: 5px 0;
  border-bottom: 1px solid var(--color-gray);
  ${mobile({ flexDirection: "column" })};
`;


const DeleteProduct = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease-in;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const Details = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`;

const Image = styled.img`
  width: 150px;
  border: 1px solid var(--color-gray);
`;

const ProductDetail = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled(Link)`
  width: fit-content;
  font-weight: 600;
  font-size: 1.4rem;
  border-bottom: 2px solid var(--color-yellow);
  transition: .3s;

  &:hover {
    border-bottom: 2px solid var(--color-light);
  }
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props['color']};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: var(--color-yellow);
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
      <Top>
        <Title>Panier</Title>
        <BackToProduct to={`/products/`}>Continue tes achats</BackToProduct>
      </Top>
      <Bottom>
        <Info empty={isEmpty}>
          {!isEmpty
            ? cart['products'].map(product => (
              <ProductCard key={product['_id']+product['size']}>
                <Link to={`/product/${product['_id']}`}><Image src={product['img']}/></Link>
                <Details>
                  <DeleteProduct color={"error"} size={'small'} onClick={e => console.log(e)}><Clear/></DeleteProduct>
                  <ProductDetail>
                    <ProductName to={`/product/${product['_id']}`}>{product['title']}</ProductName>
                    {product['color'] && <ProductColor color={product['color']}/>}
                    {product['size'] && <ProductSize><b>Taille : </b>{product['size']}</ProductSize>}
                  </ProductDetail>
                  <PriceDetail>
                    <AmountProduct size={'small'} amount={product['quantity']}/>
                    <ProductPrice>{product['price'] * product['quantity']} €</ProductPrice>
                  </PriceDetail>
                </Details>
              </ProductCard>
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