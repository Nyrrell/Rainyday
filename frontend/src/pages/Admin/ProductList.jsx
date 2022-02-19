import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

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

const ProductList = () => {
  const { products, deleteProduct, getProducts } = productStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleDelete = (e, id) => {
    e.preventDefault();
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
    { field: 'categories', headerName: 'Catégorie', width: 220 },
    {
      field: 'inStock', headerName: 'Disponible', width: 100,
      renderCell: params => <Checkbox checked={params.row.inStock}/>
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
  <DataTable
    rows={products}
    columns={columns}
    title={"produits"}
    to={'/admin/product/new'}
  />
  );
};

export default ProductList;