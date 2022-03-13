import { HighlightOff, CheckCircleOutline, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataTableAction from "../../../components/Admin/DataTable/DataTableAction.jsx";
import { DataEllipsis } from "../../../components/Admin/DataTable/DataEllipsis.jsx";
import DataTable from "../../../components/Admin/DataTable/DataTable.jsx";
import Image from "../../../components/Image.jsx";
import ProductForm from "./ProductForm.jsx";

import productStore from "../../../store/productStore.js";

const ProductImage = styled(Image)`
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
    getProducts();
  }, [getProducts])

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
    { field: 'title', headerName: 'Article', cellClassName: 'main-cell', flex: 1 },
    { field: 'category', headerName: 'Catégorie', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 1, renderCell: DataEllipsis },
    { field: 'quantity', headerName: 'Stock', type: 'number' },
    { field: 'price', headerName: 'Prix', type: 'number', valueFormatter: ({ value }) => `${value} €` },
    { field: 'discount', headerName: 'Promo', type: 'number', valueFormatter: ({ value }) => `${Number(value)} %` },
    {
      field: 'inStock', headerName: 'Visible', type: 'boolean',
      renderCell: ({ value }) => value
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
    {
      field: 'createdAt', headerName: 'Ajout', type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'updatedAt', headerName: 'Maj', type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
    },
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <ProductForm data={product} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Products;