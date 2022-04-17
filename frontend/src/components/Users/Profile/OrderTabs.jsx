import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

import orderStore from "../../../store/orderStore.js";
import OrderRow from "./OrderRow.jsx";

const TableContent = styled(Table)`
  background-color: var(--color-dark-alt);

  & th, td, button {
    color: var(--color-light);
    border-color: var(--color-gray);
  }
  
  & thead th {
    font-weight: 800;
    font-size: 1rem;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
    background-color: var(--color-gray);
    border-color: var(--color-yellow);
  }
`;

const OrderTabs = () => {
  const { getUserOrder, userOrders } = orderStore();

  useEffect(() => {
    getUserOrder();
  }, [getUserOrder]);

  return (
    <TableContainer>
      <TableContent >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Numéro de commande</TableCell>
            <TableCell align="center" className={'status'}>Status</TableCell>
            <TableCell align="center">Date commande</TableCell>
            <TableCell align="right">Articles</TableCell>
            <TableCell align="right">Promo</TableCell>
            <TableCell align="right">Prix total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders.map(order => (
            <OrderRow key={order['id']} order={order} />
          ))}
        </TableBody>
      </TableContent>
    </TableContainer>
  );
};

export default OrderTabs;