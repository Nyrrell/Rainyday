import { FindInPage, Feed } from "@mui/icons-material";
import { Dialog, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import DataGridAction from "../DataGrid/DataGridAction.jsx";
import { DataEllipsis } from "../DataGrid/DataEllipsis.jsx";
import DataTableProducts from "./DataTableProducts.jsx";
import { StatusComponent } from "./StatusComponent.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";

import orderStore from "../../../store/orderStore.js";

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

  const redirectPaypal = ({value}) => (
      <IconButton aria-label="paypal" target={"_blank"} href={`https://www.sandbox.paypal.com/webscr?cmd=_history-details-from-hub&id=${value}`}>
        <Feed/>
      </IconButton>
    );

  const getAddress = ({ value }) => {
    if (!value) return;
    const { name, address } = value;
    return (
      <>
        <Typography>{name['full_name']}</Typography>
        <Typography variant={"subtitle2"}>{address['address_line_1'] || ''} {address['address_line_2'] || ''} {address['postal_code']} {address['admin_area_2']}</Typography>
      </>
    );
  };

  const getClient = ({ value }) => {
    if (!value) return;
    const { username, email } = value;
    return (
      <>
        <Typography>{username}</Typography>
        <Typography Typography variant={"subtitle2"}>{email}</Typography>
      </>
    );
  };

  const openProduct = ({ row }) => (
    <IconButton aria-label="voir" onClick={() => handleClickOpen(row)}>
      <FindInPage/>
    </IconButton>
  );

  const columns = [
    { field: 'customer', headerName: 'Client', minWidth: 200, valueGetter: getClient, renderCell: DataEllipsis, flex: 1},
    { field: 'shipping', headerName: 'Livraison', minWidth: 300, valueGetter: getAddress, renderCell: DataEllipsis, flex: 1 },
    { field: 'paypalId', headerName: 'Paypal', type: 'actions', renderCell: redirectPaypal },
    { field: 'state', headerName: 'Status', cellClassName: 'status-chip', minWidth: 120, renderCell: StatusComponent },
    { field: 'productsTotal', headerName: 'Nb Art.', cellClassName: 'main-cell', width: 80, type: 'number' },
    { field: 'products', headerName: 'Articles', type: 'actions', renderCell: openProduct },
    {
      field: 'total', headerName: 'Total', type: 'number', width: 80, valueFormatter: ({ value = 0 }) => `${value} €`
    },
    {
      field: 'discount', headerName: 'Promo', type: 'number', width: 80,
      valueFormatter: ({ value }) => value && `- ${Number(value)} €`
    },
    { field: 'createdAt', headerName: 'Ajout', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    { field: 'updatedAt', headerName: 'Maj', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    { field: 'action', headerName: 'Action', type: 'actions', renderCell: ({ id }) => <DataGridAction id={id}/> },
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