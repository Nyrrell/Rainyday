import { Delete } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import { productRows } from '../../data.js'

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

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const ProductList = () => {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product', headerName: 'Produit', width: 200,
      renderCell: (params) => {
        return (
          <ProductItem>
            <ProductImage src={params.row.img} alt=""/>
            {params.row.name}
          </ProductItem>
        );
      },
    },
    { field: 'stock', headerName: 'Stock', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'price', headerName: 'Prix', width: 160 },
    {
      field: 'action', headerName: 'Action', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row.id}>
              <Button>Editer</Button>
            </Link>
            <Delete
              style={{ color: '#e33838', cursor: 'pointer' }}
              onClick={() => handleDelete(params.row.id)}
            />
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
        rows={data}
        disableSelectionOnClick
        columns={columns}
        checkboxSelection
      />
    </>
  );
};

export default ProductList;