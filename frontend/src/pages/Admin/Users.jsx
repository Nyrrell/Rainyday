import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

import DataTable from "../../components/Admin/DataTable.jsx";
import userStore from "../../store/userStore.js";
import DataTableAction from "../../components/Admin/DataTableAction.jsx";
import UserForm from "../../components/Admin/Form/UserForm.jsx";

const Users = () => {
  const [open, setOpen] = useState(false);
  const { users, getUsers, deleteUser } = userStore();

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const columns = [
    { field: 'username', headerName: 'Utilisateur', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'lastname', headerName: 'Nom', flex: 1 },
    { field: 'firstname', headerName: 'Prénom', flex: 1 },
    { field: 'credit', headerName: 'Avoir' },
    { field: 'sale', headerName: 'Vente' },
    { field: 'total', headerName: 'Total' },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: (params) => <DataTableAction id={params['row']['_id']} to={"/admin/user/"}
                                               handleDelete={handleDelete}/>
    },
  ];
  return (
    <>
      <DataTable
        rows={users}
        columns={columns}
        title={"utilisateurs"}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <UserForm type={'enregister'} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Users;