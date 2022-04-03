import { CheckCircleOutline, HighlightOff, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import { DataEllipsis } from "../DataGrid/DataEllipsis.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";
import ImageBadge from "../../Common/ImageBadge.jsx";
import CategoryForm from "./CategoryForm.jsx";

import categoryStore from "../../../store/categoryStore.js";

const CategoryImage = styled(ImageBadge)`
  width: 2.6rem;
  height: 2.6rem;
`;

const Categories = () => {
  const { categories, getCategories, deleteCategory } = categoryStore();
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCategories("private");
  }, [getCategories])

  const handleClickOpen = () => {
    setCategory(null)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    categoryStore.setState({ error: false });
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
    { field: 'img', headerName: 'Image', type: 'actions', renderCell: ({ value }) => <CategoryImage src={value}/> },
    { field: 'title', headerName: 'Catégorie', cellClassName: 'main-cell', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 3, renderCell: DataEllipsis },
    {
      field: 'visible', headerName: 'Visible', type: 'boolean',
      renderCell: ({ value }) => value
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
    { field: 'createdAt', headerName: 'Ajout', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    { field: 'updatedAt', headerName: 'Maj', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    {
      field: 'action', headerName: 'Action', type: 'actions',
      renderCell: ({ id }) => <DataGridAction id={id} handleDelete={handleDelete} onClick={handleEdit}/>
    },
  ];

  return (
    <>
      <AdminDataGrid
        rows={categories}
        columns={columns}
        title={"catégories"}
        onClick={handleClickOpen}
        create
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <CategoryForm data={category} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Categories;