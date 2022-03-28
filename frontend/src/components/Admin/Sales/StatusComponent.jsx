import { AutorenewOutlined, CancelOutlined, Done, NewReleasesOutlined, PendingOutlined } from "@mui/icons-material";
import { Chip } from "@mui/material";


export const StatusComponent = (status) => {

  const ENUM_STATUS = [
    { status: 'pending', value: 'non payé', icon: <AutorenewOutlined/>, color: 'secondary' },
    { status: 'new', value: 'nouveau', icon: <NewReleasesOutlined/>, color: 'info' },
    { status: 'delay', value: 'retard', icon: <PendingOutlined/>, color: 'warning' },
    { status: 'cancelled', value: 'annuler', icon: <CancelOutlined/>, color: 'error' },
    { status: 'fulfilled', value: 'envoyer', icon: <Done/>, color: 'success' },
    { status: 'error', value: 'erreur', icon: <CancelOutlined/>, color: 'error' }
  ]

  const STATUS = ENUM_STATUS.find(enums => enums.status === status.value);

  return (
    <Chip label={STATUS['value']} color={STATUS['color']} icon={STATUS['icon']} variant="outlined" size={'small'}/>
  );
};