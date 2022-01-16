import { Delete } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import { userList } from '../../data.js'

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PageTitle = styled.h1``;

const AddUser = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-size: 16px;
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

const UserList = () => {
  const [data, setData] = useState(userList);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'Utilisateur', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'transaction', headerName: 'Transaction', width: 160 },
    {
      field: 'action', headerName: 'Action', width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row.id}>
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
        <PageTitle>Liste des utilisateurs</PageTitle>
        <Link to={'/admin/user/new'}>
          <AddUser>Créer</AddUser>
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

export default UserList;