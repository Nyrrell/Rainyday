import { DataGrid, frFR } from '@mui/x-data-grid';
import styled from "styled-components";
import { Button } from "@mui/material";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PageTitle = styled.h1``;
const AddButton = styled(Button)``;

const DataTable = ({ rows, columns, title, onClick }) => {
  return (
    <>
      <TitleContainer>
        <PageTitle>Liste des {title}</PageTitle>
        <AddButton variant={'outlined'} onClick={onClick}>Nouveau</AddButton>
      </TitleContainer>
      <DataGrid
        rows={rows}
        getRowId={row => row._id}
        disableSelectionOnClick
        columns={columns}
        autoHeight
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
      />
    </>
  );
};

export default DataTable;