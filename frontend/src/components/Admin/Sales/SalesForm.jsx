import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import orderStore from "../../../store/orderStore.js";
import { useState } from "react";

import { ENUM_STATUS } from "./StatusComponent.jsx";
import AdminForm from "../AdminForm.jsx";

const SalesForm = ({ order, close }) => {
  const { updateOrders, error, isFetching } = orderStore();
  const [data, setData] = useState(order);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateOrders(data);
  }

  return (
    <AdminForm title={"Edition commande"} valid={handleClick} close={close} error={error} fetching={isFetching}>
      <FormControl fullWidth>
        <InputLabel id="status-order">Status de la commande</InputLabel>
        <Select
          labelId="status-order"
          name={'state'}
          defaultValue={data['state']}
          onChange={handleChange}
          input={<OutlinedInput label="Status de la commande"/>}
        >
          {ENUM_STATUS.map(({ value, status }, index) => (
              <MenuItem
                key={index}
                value={status}
              >
                {value}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </AdminForm>
  );
};

export default SalesForm;