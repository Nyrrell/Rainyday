import { HighlightOff, CheckCircleOutline, } from "@mui/icons-material";
import { useEffect } from "react";
import styled from "styled-components";

import DataTableAction from "../DataTable/DataTableAction.jsx";
import { DataEllipsis } from "../DataTable/DataEllipsis.jsx";
import DataTable from "../DataTable/DataTable.jsx";
import Image from "../../Image.jsx";

import orderStore from "../../../store/orderStore.js";

const ProductImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

const Sales = () => {
  const { allOrders, getAllOrders, updateOrders } = orderStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders])

  const columns = [
    { field: '_id', headerName: 'Commande', cellClassName: 'main-cell', flex: 1 },
    { field: 'state', headerName: 'Status' },
    { field: 'customer', headerName: 'Client', flex: 1 },
    // { field: 'products', headerName: 'Articles', flex: 1, renderCell: DataEllipsis },
    { field: 'products', headerName: 'Articles' },
    { field: 'productsTotal', headerName: 'Nb Articles', type: 'number' },
    { field: 'total', headerName: 'Total', type: 'number', valueFormatter: ({ value }) => `${value} €` },
    { field: 'discount', headerName: 'Promo', type: 'number', valueFormatter: ({ value }) => `${Number(value)} %` },
    {
      field: 'inStock', headerName: 'Visible', type: 'boolean',
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
      renderCell: ({ id }) => <DataTableAction id={id} />
    },
  ];

  return (
    <>
      <DataTable
        rows={allOrders}
        columns={columns}
        title={"produits"}
      />
    </>
  );
};

export default Sales;