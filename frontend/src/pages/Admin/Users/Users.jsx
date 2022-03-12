import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

import DataTableAction from "../../../components/Admin/DataTable/DataTableAction.jsx";
import UserForm from "./UserForm.jsx";
import DataTable from "../../../components/Admin/DataTable/DataTable.jsx";
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
    { field: 'username', headerName: 'Utilisateur', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'lastname', headerName: 'Nom', flex: 1 },
    { field: 'firstname', headerName: 'Prénom', flex: 1 },
    { field: 'credit', headerName: 'Avoir', type: 'number', renderCell: ({ value }) => `${Number(value)} €` },
    { field: 'sale', headerName: 'Vente', type: 'number' },
    { field: 'total', headerName: 'Total', type: 'number' },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: ({ id }) => <DataTableAction id={id} handleDelete={handleDelete} onClick={handleEdit}/>
    },
  ];
  return (
    <>
      <DataTable
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