import { DeleteOutline, EditOutlined, DoNotDisturb, CheckCircleOutline, } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import ProductForm from "../../components/Admin/Form/ProductForm.jsx";
import DataTable from "../../components/Admin/DataTable.jsx";
import productStore from "../../store/productStore.js";

const ProductItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const Categories = () => {
  const [open, setOpen] = useState(false);
  const { products, deleteProduct } = productStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e, id) => {
    deleteProduct(id);
  };

  const columns = [
    {
      field: 'product', headerName: 'Produit', width: 200,
      renderCell: (params) => {
        return (
          <ProductItem>
            <ProductImage src={params.row.img} alt=""/>
            {params.row.title}
          </ProductItem>
        );
      },
    },
    { field: 'category', headerName: 'Catégorie', width: 220 },
    {
      field: 'inStock', headerName: 'Disponible', width: 100,
      renderCell: params => params.row.inStock ? <CheckCircleOutline color={"success"}/> : <DoNotDisturb color={"warning"}/>
    },
    {
      field: 'quantity',
      headerName: 'Stock',
      width: 100,
    },
    { field: 'price', headerName: 'Prix', width: 160, renderCell: params => <>{`${params.row.price} €`}</> },
    {
      field: 'action', headerName: 'Action', width: 100,
      renderCell: params => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
              <IconButton aria-label="éditer" color={'info'}>
                <EditOutlined/>
              </IconButton>
            </Link>
            <IconButton aria-label="delete" color={"warning"} onClick={() => handleDelete(params.row._id)}>
              <DeleteOutline/>
            </IconButton>
          </>
        )
      }
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
        <ProductForm type={'enregister'} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Categories;