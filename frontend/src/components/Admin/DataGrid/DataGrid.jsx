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

const DataGridStyle = styled(DataGrid)`
  & .main-cell {
    font-weight: 800;
    text-transform: capitalize;
  }
  
  & .status-chip {
    justify-content: center;
    text-transform: uppercase;
    font-weight: 600;
  }
`;


const AdminDataGrid = ({ rows, columns, title, onClick, create }) => {
  return (
    <>
      <TitleContainer>
        <PageTitle>Liste des {title}</PageTitle>
        {create && <Button variant={'outlined'} onClick={onClick}>Nouveau</Button>}
      </TitleContainer>
      <DataGridStyle
        rows={rows}
        getRowId={row => row._id}
        disableSelectionOnClick
        columns={columns}
        autoHeight
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        getRowHeight={() => {
          return 1000
        }}
      />
    </>
  );
};

export default AdminDataGrid;