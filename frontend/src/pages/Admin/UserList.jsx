import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";
import { Link } from "react-router-dom";

import DataTable from "../../components/Admin/DataTable.jsx";
import userStore from "../../store/userStore.js";

const UserList = () => {
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

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteUser(id);
  };

  const columns = [
    { field: 'username', headerName: 'Utilisateur', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'lastname', headerName: 'Nom', width: 200 },
    { field: 'firstname', headerName: 'Prénom', width: 200 },
    { field: 'status', headerName: 'Avoir', width: 120 },
    { field: 'transaction', headerName: 'Transaction', width: 160 },
    {
      field: 'action', headerName: 'Action', width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row._id}>
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
  // TODO MODAL
  return (
    <>
      <DataTable
        rows={users}
        columns={columns}
        title={"utilisateurs"}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;