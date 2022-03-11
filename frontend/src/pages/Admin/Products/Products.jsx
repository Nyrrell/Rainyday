import { HighlightOff, CheckCircleOutline, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataTableAction from "../../../components/Admin/DataTable/DataTableAction.jsx";
import ProductForm from "./Components/ProductForm.jsx";
import DataTable from "../../../components/Admin/DataTable/DataTable.jsx";
import productStore from "../../../store/productStore.js";

const ProductImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

const Products = () => {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const { products, getProducts, deleteProduct } = productStore();

  useEffect(() => {
    if (products.length) return;
    getProducts();
  }, [getProducts, products])

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

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteProduct(id);
  };

  const columns = [
    {
      field: 'img',
      headerName: 'Image',
      type: 'actions',
      renderCell: ({ value }) => <ProductImage src={process.env.REACT_APP_BACKEND_URL + value} alt="image"/>
    },
    { field: 'title', headerName: 'Article', flex: 2 },
    { field: 'category', headerName: 'Catégorie', flex: 1 },
    { field: 'quantity', headerName: 'Stock', type: 'number' },
    {
      field: 'inStock', headerName: 'Visible', type: 'boolean',
      renderCell: ({ value }) => value
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
    { field: 'price', headerName: 'Prix', type: 'number', renderCell: ({ value }) => <>{`${value} €`}</> },
    { field: 'discount', headerName: 'Promo', type: 'number', renderCell: ({ value }) => <>{`${Number(value)} %`}</> },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: ({ id }) => <DataTableAction id={id} handleDelete={handleDelete} onClick={handleEdit}/>
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
        <ProductForm data={product} type={product ? 'update' : 'enregister'} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Products;