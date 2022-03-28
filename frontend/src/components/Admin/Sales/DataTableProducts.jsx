import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import ImagePopover from "../ImagePopover.jsx";
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

const ProductImage = styled.img`
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
                <ProductImage src={process.env.REACT_APP_BACKEND_URL + row['img']} onClick={handleClick}/>
              </TableCell>
              <TableCell>{row['title']}</TableCell>
              <TableCell>{row['category']['title']}</TableCell>
              <TableCell className={'quantity-cell'} align="right">
                {order?.['products'].find(p => p.productId = row['_id'])['quantity']}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className={'total-row'}>
            <TableCell rowSpan={2}/>
            <TableCell align="right" colSpan={2}>Total</TableCell>
            <TableCell align="right">{order?.['productsTotal']}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ImagePopover open={open} element={anchorEl} close={handleClose}/>
    </Container>
  );
};

export default DataTableProducts;