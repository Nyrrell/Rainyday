import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

import { deleteProduct, getProducts } from "../../reducers/apiCalls.js";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PageTitle = styled.h1``;

const AddProduct = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 16px;
`;

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
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
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
    { field: 'inStock', headerName: 'Stock', width: 200, renderCell: params => <Checkbox checked={params.row.inStock} />},
    { field: 'price', headerName: 'Prix', width: 160, renderCell: params => <>{`${params.row.price} €`}</>},
    {
      field: 'action', headerName: 'Action', width: 150,
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
      <TitleContainer>
        <PageTitle>Liste des produits</PageTitle>
        <Link to={'/admin/product/new'}>
          <AddProduct>Créer</AddProduct>
        </Link>
      </TitleContainer>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        checkboxSelection
      />
    </>
  );
};

export default ProductList;