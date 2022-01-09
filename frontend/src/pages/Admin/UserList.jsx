import { DataGrid } from '@mui/x-data-grid';
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import { userList } from '../../data.js'

const Container = styled.div`
  flex: 5;
  padding: 20px;
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
        return(
          <>
            <Link to={"/admin/user/" + params.row.id}>
              <Button>Editer</Button>
            </Link>
            <Delete
              style={{ color: '#e33838', cursor:'pointer' }}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        )
      }
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        checkboxSelection
      />
    </Container>
  );
};

export default UserList;