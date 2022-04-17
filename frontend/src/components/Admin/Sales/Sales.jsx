import { FindInPage, Feed } from "@mui/icons-material";
import { Dialog, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { StatusComponent } from "./StatusComponent.jsx";
import DataGridAction from "../DataGrid/DataGridAction.jsx";
import { DataEllipsis } from "../DataGrid/DataEllipsis.jsx";
import DataTableProducts from "./DataTableProducts.jsx";
import AdminDataGrid from "../DataGrid/DataGrid.jsx";

import orderStore from "../../../store/orderStore.js";
import SalesForm from "./SalesForm.jsx";

const Sales = () => {
  const { allOrders, getAllOrders } = orderStore();
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (row) => {
    setProduct(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOrder(null);
    setProduct(null);
    orderStore.setState({ error: false });
  };

  const handleEdit = (id) => {
    setOrder(allOrders.find(o => o['_id'] === id));
    setOpen(true);
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
        <Typography variant={"subtitle2"}>{email}</Typography>
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
    { field: 'total', headerName: 'Total', type: 'number', width: 80, valueFormatter: ({ value = 0 }) => `${value} €` },
    { field: 'discountAmount', headerName: 'Promo', type: 'number', width: 80, renderCell: ({ value }) => value && `- ${Number(value)} %` },
    { field: 'discount', headerName: 'Code' },
    { field: 'createdAt', headerName: 'Ajout', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    { field: 'updatedAt', headerName: 'Maj', type: 'date', valueGetter: ({ value }) => value && new Date(value) },
    { field: 'action', headerName: 'Action', type: 'actions', renderCell: ({ id }) => <DataGridAction id={id} onClick={handleEdit}/> },
  ];

  return (
    <>
      <AdminDataGrid
        rows={allOrders}
        columns={columns}
        title={"ventes"}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={product ? "md" : "xs"}>
        {Boolean(product) && <DataTableProducts order={product}/>}
        {Boolean(order) && <SalesForm order={order} close={handleClose}/>}
      </Dialog>
    </>
  );
};

export default Sales;