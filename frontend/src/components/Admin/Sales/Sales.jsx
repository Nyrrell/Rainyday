import { FindInPage, } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import { DataEllipsis } from "../DataGrid/DataEllipsis.jsx";
import DataTableProducts from "./DataTableProducts.jsx";
import { StatusComponent } from "./StatusComponent.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";


import orderStore from "../../../store/orderStore.js";
import ProductForm from "../Products/ProductForm.jsx";
import login from "../../Users/Login.jsx";

const Sales = () => {
  const { allOrders, getAllOrders, updateOrders } = orderStore();
  const [order, setOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOrder(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOrder(null);
    setOpen(false);
  };


  useEffect(() => {
    getAllOrders();
  }, [getAllOrders])

  const getAddress = (params) => {
    const address = params['row']['shipping'] && params['row']['shipping']['address'];
    if (address)
      return `${address['address_line_1'] || ''} ${address['address_line_2'] || ''} ${address['postal_code']} ${address['admin_area_2']}`;
  };

  const getName = (params) => params?.['value']?.['name']?.['full_name'];

  const openProduct = ({ row }) => (
    <IconButton aria-label="voir" onClick={() => handleClickOpen(row)}>
      <FindInPage/>
    </IconButton>
  );

  const columns = [
    { field: 'paypalId', headerName: 'Transaction Paypal', cellClassName: 'main-cell', minWidth: 180 },
    { field: 'state', headerName: 'Status', cellClassName: 'status-chip', minWidth: 120, renderCell: StatusComponent },
    { field: 'shipping', headerName: 'Client', minWidth: 200, valueGetter: getName, renderCell: DataEllipsis },
    { field: 'address', headerName: 'Adresse', minWidth: 300, valueGetter: getAddress, renderCell: DataEllipsis },
    // { field: 'products', headerName: 'Articles', flex: 1, renderCell: DataEllipsis },
    { field: 'productsTotal', headerName: 'Nb Art.', cellClassName: 'main-cell', width: 80, type: 'number' },
    { field: 'products', headerName: 'Articles', renderCell: openProduct, type: 'actions' },
    {
      field: 'total', headerName: 'Total', type: 'number', width: 80,
      valueFormatter: ({ value }) => `${value || 0} €`
    },
    {
      field: 'discount', headerName: 'Promo', type: 'number', width: 80,
      valueFormatter: ({ value }) => value && `- ${Number(value)} €`
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
      renderCell: ({ id }) => <DataGridAction id={id}/>
    },
  ];

  return (
    <>
      <AdminDataGrid
        rows={allOrders}
        columns={columns}
        title={"ventes"}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DataTableProducts open={open} close={handleClose} order={order}/>
      </Dialog>
    </>
  );
};

export default Sales;