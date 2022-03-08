import { HighlightOff, CheckCircleOutline, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataTableAction from "../../components/Admin/DataTableAction.jsx";
import ProductForm from "../../components/Admin/Form/ProductForm.jsx";
import DataTable from "../../components/Admin/DataTable.jsx";
import productStore from "../../store/productStore.js";

const ProductImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const Products = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const { products, deleteProduct } = productStore();

  const handleClickOpen = () => {
    setProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleEdit = (id) => {
    setProduct(products.find(p => p['_id'] === id));
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const columns = [
    {
      field: 'img',
      headerName: 'Image',
      type: 'actions',
      renderCell: (params) => <ProductImage src={params.row.img} alt="image"/>
    },
    { field: 'title', headerName: 'Article', flex: 1 },
    { field: 'category', headerName: 'Catégorie', flex: 1 },
    {
      field: 'inStock', headerName: 'Visible', type: 'boolean',
      renderCell: params => params.row.inStock
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
    { field: 'quantity', headerName: 'Stock', type: 'number' },
    { field: 'price', headerName: 'Prix', type: 'number', renderCell: params => <>{`${params.row.price} €`}</> },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: (params) => <DataTableAction id={params['row']['_id']} handleDelete={handleDelete}
                                               onClick={handleEdit}/>
    },
  ];

  return (
    <>
      <DataTable
        rows={products}
        columns={columns}
        title={"produits"}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <ProductForm data={product} type={product ? 'update' : 'enregister'} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Products;