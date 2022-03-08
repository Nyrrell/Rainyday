import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const DataTableAction = ({ id, handleDelete, onClick }) => {
  return (
    <>
      <IconButton aria-label="éditer" color={'info'} onClick={() => onClick(id)}>
        <EditOutlined/>
      </IconButton>
      <IconButton aria-label="delete" color={"warning"} onClick={() => handleDelete(id)}>
        <DeleteOutline/>
      </IconButton>
    </>
  );
};

export default DataTableAction;