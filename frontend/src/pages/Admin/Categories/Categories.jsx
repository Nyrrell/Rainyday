import { CheckCircleOutline, HighlightOff, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataTableAction from "../../../components/Admin/DataTable/DataTableAction.jsx";
import DataTable from "../../../components/Admin/DataTable/DataTable.jsx";
import CategoryForm from "./CategoryForm.jsx";
import Image from "../../../components/Image.jsx";

import categoryStore from "../../../store/categoryStore.js";

const CategoryImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

const Categories = () => {
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const { categories, getCategories, deleteCategory } = categoryStore();

  useEffect(() => {
    getCategories();
  }, [getCategories])

  const handleClickOpen = () => {
    setCategory(null)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    setCategory(categories.find(c => c['_id'] === id));
    setOpen(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteCategory(id);
  };

  const columns = [
    {
      field: 'img',
      headerName: 'Image',
      type: 'actions',
      renderCell: ({ value }) => <CategoryImage src={process.env.REACT_APP_BACKEND_URL + value} alt="image"/>
    },
    { field: 'title', headerName: 'Catégorie', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 4 },
    {
      field: 'visible', headerName: 'Visible', type: 'boolean',
      renderCell: ({ value }) => value
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: ({ id }) => <DataTableAction id={id} handleDelete={handleDelete} onClick={handleEdit}/>
    },
  ];

  return (
    <>
      <DataTable
        rows={categories}
        columns={columns}
        title={"catégories"}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <CategoryForm data={category} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Categories;