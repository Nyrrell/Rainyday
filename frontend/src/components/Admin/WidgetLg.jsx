import styled from "styled-components";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestApi.js";

const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: left;
`;
const Td = styled.td`
  font-weight: ${props => props['fontWeight']};
`;

const Button = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: ${props => {
    switch (props['type']) {
      case "approuvé" :
        return "#e5faf2"
      case "declined" :
        return "#fff0f1"
      case "pending" :
        return "#ebf1fe"
      default:
        return "gray"
    }
  }};
  color: ${props => {
    switch (props.type) {
      case "approuvé" :
        return "#3bb077"
      case "declined" :
        return "#d95087"
      case "pending" :
        return "#2a7ade"
      default:
        return "white"
    }
  }};
`;

const WidgetLg = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await userRequest.get("orders");
        setOrders(data);
      } catch {
      }
    };
    getOrders();
  }, []);

  const Status = ({ type }) => <Button type={type}>{type}</Button>

  const formatDate = (date) => {
    return new Intl.RelativeTimeFormat('fr').format(
      Math.ceil(
        (new Date(date) - new Date()) / 1000 / 60 / 60 / 24
      ),
      "day"
    )
  }

  return (
    <Container>
      <Title>Dernières transactions</Title>
      <Table>
        <THead>
          <Tr>
            <Th>Client</Th>
            <Th>Date</Th>
            <Th>Montant</Th>
            <Th>Status</Th>
          </Tr>
        </THead>
        <TBody>
          {orders.map(order => (
            <Tr key={order['_id']}>
              <Td fontWeight={600}>{order['userId']}</Td>
              <Td fontWeight={300}>{formatDate(order['createdAt'])}</Td>
              <Td fontWeight={300}>{order['amount']} €</Td>
              <Td><Status type={order['status']}/></Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Container>
  );
};

export default WidgetLg;