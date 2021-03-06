import { HighlightOff, CheckCircleOutline, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import { DataEllipsis } from "../DataGrid/DataEllipsis.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";
import ImageBadge from "../../Common/ImageBadge.jsx";
import ProductForm from "./ProductForm.jsx";

import productStore from "../../../store/productStore.js";
import categoryStore from "../../../store/categoryStore.js";

const ProductImage = styled(ImageBadge)`
  width: 2.6rem;
  height: 2.6rem;
`;

const Products = () => {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const { products, getProducts, deleteProduct } = productStore();
  const { categories, getCategories, } = categoryStore();

  useEffect(() => {
    getProducts('private');
    getCategories('private');
  }, [getProducts, getCategories])

  const handleClickOpen = () => {
    setProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    productStore.setState({ error: false });
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
    { field: 'img', headerName: 'Image', type: 'actions', renderCell: ({ value }) => <ProductImage src={value}/> },
    { field: 'title', headerName: 'Article', cellClassName: 'main-cell', flex: 1 },
    { field: 'category', headerName: 'Catégorie', valueGetter: ({ value }) => value?.['title'], flex: 1 },
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
    { field: 'createdAt', headerName: 'Ajout', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    { field: 'updatedAt', headerName: 'Maj', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: ({ id }) => <DataGridAction id={id} handleDelete={handleDelete} onClick={handleEdit}/>
    },
  ];

  return (
    <>
      <AdminDataGrid
        rows={products}
        columns={columns}
        title={"produits"}
        onClick={handleClickOpen}
        create={Boolean(categories.length)}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <ProductForm data={product} categories={categories} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Products;