import { HighlightOff, CheckCircleOutline, } from "@mui/icons-material";
import { useEffect } from "react";
import styled from "styled-components";

import DataTableAction from "../DataTable/DataTableAction.jsx";
import { DataEllipsis } from "../DataTable/DataEllipsis.jsx";
import { StatusComponent } from "./StatusComponent.jsx";
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

  const getAddress = (params) => {
    const address = params['row']['shipping'] && params['row']['shipping']['address'];
    if (address)
    return `${address['address_line_1'] || ''} ${address['address_line_2'] || ''} ${address['postal_code']} ${address['admin_area_2']}`;
  };

  const columns = [
    { field: '_id', headerName: 'Commande', cellClassName: 'main-cell', flex: 0.5 },
    { field: 'state', headerName: 'Status', cellClassName: 'status-chip',renderCell: StatusComponent },
    { field: 'shipping', headerName: 'Client', valueGetter: (params) => params?.['value']?.['name']?.['full_name'] },
    { field: 'address', headerName: 'Adresse', minWidth: 100, flex: 1, valueGetter: getAddress },
    // { field: 'products', headerName: 'Articles', flex: 1, renderCell: DataEllipsis },
    { field: 'productsTotal', headerName: 'Nb Articles', type: 'number' },
    { field: 'products', headerName: 'Articles' },
    { field: 'total', headerName: 'Total', type: 'number', valueFormatter: ({ value }) => `${value} €` },
    { field: 'discount', headerName: 'Promo', type: 'number', valueFormatter: ({ value }) => `${Number(value)} %` },
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
        title={"ventes"}
      />
    </>
  );
};

export default Sales;