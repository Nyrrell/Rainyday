import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const DataTableAction = ({to, id, handleDelete}) => {
  return (
    <>
      <Link to={`${to}${id}`}>
        <IconButton aria-label="éditer" color={'info'}>
          <EditOutlined/>
        </IconButton>
      </Link>
      <IconButton aria-label="delete" color={"warning"} onClick={() => handleDelete(id)}>
        <DeleteOutline/>
      </IconButton>
    </>
  );
};

export default DataTableAction;