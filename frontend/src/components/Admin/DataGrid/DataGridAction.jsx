import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";

const DataGridAction = ({ id, handleDelete, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="éditer" color={'info'} onClick={() => onClick(id)}>
        <EditOutlined/>
      </IconButton>
      <IconButton aria-label="delete" color={"warning"} onClick={handleClickOpen}>
        <DeleteOutline/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{"Cette opération est irréversible, confirmer la suppresion."}</DialogContent>
        <DialogActions>
          <Button fullWidth variant={'contained'} color="info" onClick={(e) => handleDelete(e, id)}>Confirmer</Button>
          <Button fullWidth variant={'outlined'} color="error" onClick={handleClose}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataGridAction;