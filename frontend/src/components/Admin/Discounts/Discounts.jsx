import { CheckCircleOutline, HighlightOff, Stars } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";
import DiscountForm from "./DiscountForm.jsx";

import discountStore from "../../../store/discountStore.js";

const Categories = () => {
  const [discount, setDiscount] = useState(null);
  const [open, setOpen] = useState(false);
  const { discountCodes, getDiscountCodes, deleteDiscountCode } = discountStore();

  useEffect(() => {
    getDiscountCodes();
  }, [getDiscountCodes])

  const handleClickOpen = () => {
    setDiscount(null)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    discountStore.setState({ error: false });
  };

  const handleEdit = (id) => {
    setDiscount(discountCodes.find(c => c['_id'] === id));
    setOpen(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteDiscountCode(id);
  };

  const columns = [
    {
      field: 'title', headerName: 'Code', cellClassName: 'main-cell', flex: 1,
    },
    { field: 'desc', headerName: 'Description', flex: 3 },
    {
      field: 'percentage', headerName: 'Réduction', type: 'number',
      valueFormatter: ({ value }) => `${value} %`
    },
    {
      field: 'active', headerName: 'Actif', type: 'boolean',
      renderCell: ({ value }) => value
        ? <CheckCircleOutline color={"success"}/>
        : <HighlightOff color={"warning"}/>
    },
    {
      field: 'announce', headerName: 'Accueil', type: 'boolean',
      renderCell: ({ value }) => value && <Stars color={"warning"}/>
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
        rows={discountCodes}
        columns={columns}
        title={"codes promo"}
        onClick={handleClickOpen}
        create
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DiscountForm data={discount} close={handleClose}/>
      </Dialog>
    </>
  );
};

export default Categories;