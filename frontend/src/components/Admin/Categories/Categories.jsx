import { CheckCircleOutline, HighlightOff, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import { DataEllipsis } from "../DataGrid/DataEllipsis.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";
import CategoryForm from "./CategoryForm.jsx";
import Image from "../../Image.jsx";

import categoryStore from "../../../store/categoryStore.js";
import ImagePopover from "../ImagePopover.jsx";

const CategoryImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  cursor: zoom-in;
`;

const Categories = () => {
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const { categories, getCategories, deleteCategory } = categoryStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    getCategories("private");
  }, [getCategories])

  const handleClickOpen = () => {
    setCategory(null)
    setOpen(true);
  };

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (openPopover) return setAnchorEl(null);
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
    {
      field: 'img',
      headerName: 'Image',
      type: 'actions',
      renderCell: ({ value }) => <CategoryImage onClick={handleClickPopover} src={process.env.REACT_APP_BACKEND_URL + value}/>
    },
    { field: 'title', headerName: 'Catégorie', cellClassName: 'main-cell', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 3, renderCell: DataEllipsis },
    {
      field: 'visible', headerName: 'Visible', type: 'boolean',
      renderCell: ({ value }) => value
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
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
        rows={categories}
        columns={columns}
        title={"catégories"}
        onClick={handleClickOpen}
        create
      />
      <ImagePopover open={openPopover} element={anchorEl} close={handleClose}/>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <CategoryForm data={category} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Categories;