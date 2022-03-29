import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import UserForm from "./UserForm.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";
import userStore from "../../../store/userStore.js";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { users, getUsers, deleteUser } = userStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleClose = () => {
    setOpen(false);
  userStore.setState({ error: false });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteUser(id);
  };

  const handleEdit = (id) => {
    setUser(users.find(p => p['_id'] === id));
    setOpen(true);
  };

  const columns = [
    { field: 'username', headerName: 'Utilisateur', cellClassName: 'main-cell', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'lastname', headerName: 'Nom', flex: 1 },
    { field: 'firstname', headerName: 'Prénom', flex: 1 },
    { field: 'credit', headerName: 'Avoir', type: 'number', valueFormatter: ({ value }) => `${Number(value)} €` },
    { field: 'sale', headerName: 'Vente', type: 'number' },
    { field: 'total', headerName: 'Total', type: 'number' },
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
      renderCell: ({ id }) => <DataGridAction id={id} handleDelete={handleDelete} onClick={handleEdit}/>
    },
  ];
  return (
    <>
      <AdminDataGrid
        rows={users}
        columns={columns}
        title={"utilisateurs"}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <UserForm user={user} type={'update'} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Users;