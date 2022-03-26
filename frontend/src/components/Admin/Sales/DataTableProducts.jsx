import {
  Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow
} from "@mui/material";
import styled from "styled-components";
import Image from "../../Image.jsx";
import { useEffect, useState } from "react";
import { userRequest } from "../../../services/requestApi.js";

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
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  flex: 0 0 100%;
  padding: 20px 0;
`;

const ProductImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  
  &:hover {
    cursor: zoom-in;
  }
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
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((row) => (
            <TableRow
              key={row['_id']}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className={'image-cell'}>
                <ProductImage
                  src={process.env.REACT_APP_BACKEND_URL + row['img']}/>
              </TableCell>
              <TableCell>{row['title']}</TableCell>
              <TableCell>{row['cat']}</TableCell>
              <TableCell align="right">{order?.['products'].find(p => p.productId = row['_id'])['quantity']}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={2}/>
            <TableCell align="right" colSpan={2}>Total</TableCell>
            <TableCell align="right">{order?.['productsTotal']}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default DataTableProducts;