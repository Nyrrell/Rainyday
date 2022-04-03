import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { userRequest } from "../../../hooks/requestApi.js";
import ImageBadge from "../../Common/ImageBadge.jsx";

const Container = styled(TableContainer)`
  padding: 1rem 2rem;

  & .MuiTableCell-head {
    font-weight: 800;
    font-size: 1rem;
  }

  & .image-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .quantity-cell {
    font-weight: 600;
    font-size: 1rem;
  }

  & .total-row > .MuiTableCell-root {
    padding-top: 1rem;
    font-weight: 800;
    font-size: 1.2rem;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  flex: 0 0 100%;
  padding: 20px 0;
`;

const DataTableProducts = ({ order }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (!order) return;
    const getOrder = async () => {
      try {
        const { data } = await userRequest.post(`/orders/${order['_id']}/find`);
        setProduct(data);
      } catch (e) {
        console.log(e)
      }
    }
    getOrder()
  }, [order])

  return (
    <Container>
      <Title>Liste des articles</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" variant={'head'}>Image</TableCell>
            <TableCell variant={'head'}>Produit</TableCell>
            <TableCell variant={'head'}>Catégorie</TableCell>
            <TableCell align="right" variant={'head'}>Quantité</TableCell>
            <TableCell align="right" variant={'head'}>Prix unitaire</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((row) => {
            const productDetail = order?.['products'].find(p => p['_id'] === row['_id'])
            return (
              <TableRow
                key={row['_id']}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={'image-cell'}>
                  <ImageBadge src={row['img']}/>
                </TableCell>
                <TableCell>{row['title']}</TableCell>
                <TableCell>{row['category']['title']}</TableCell>
                <TableCell className={'quantity-cell'} align="right">{productDetail?.['quantity']}</TableCell>
                <TableCell className={'quantity-cell'} align="right">{productDetail?.['price']} €</TableCell>
              </TableRow>
            )
          })}
          <TableRow className={'total-row'}>
            <TableCell rowSpan={2}/>
            <TableCell align="right" colSpan={2}>Total</TableCell>
            <TableCell align="right">{order?.['productsTotal']}</TableCell>
            <TableCell align="right">{order?.['total']} €</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default DataTableProducts;