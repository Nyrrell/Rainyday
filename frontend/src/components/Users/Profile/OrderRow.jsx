import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";

import { StatusComponent } from "../../Admin/Sales/StatusComponent.jsx";
import BaseTitle from "../../Common/BaseTitle.jsx";
import ImageBadge from "../../Common/ImageBadge.jsx";

const ListArticle = styled(BaseTitle)`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDown/> : <KeyboardArrowRight/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{order['id']}</TableCell>
        <TableCell align="center"><StatusComponent value={order['state']}/></TableCell>
        <TableCell align="center">{new Date(order['createdAt']).toLocaleString()}</TableCell>
        <TableCell align="right">{order['productsTotal']}</TableCell>
        <TableCell align="right">{order['discountAmount'] ? `- ${order['discountAmount']}%` : null}</TableCell>
        <TableCell align="right">{order['total']} €</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <ListArticle forwardedAs={'h2'}>
                Article{order['productsTotal'] && 's'} de la commande
              </ListArticle>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Article</TableCell>
                    <TableCell>Catégorie</TableCell>
                    <TableCell align="right">Quantités</TableCell>
                    <TableCell align="right">Prix unitaire</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order['products']?.map((product) => (
                    <TableRow key={product['article']}>
                      <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ImageBadge src={product['img']}/>
                        {product['article']}
                      </TableCell>
                      <TableCell>{product['category']}</TableCell>
                      <TableCell align="right">{product['quantity']}</TableCell>
                      <TableCell align="right">{product['price']} €</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;