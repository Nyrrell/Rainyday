import { Switch, TextField, FormControlLabel, InputAdornment, Stack } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

import AdminForm from "../../../components/Admin/AdminForm.jsx";
import discountStore from "../../../store/discountStore.js";

const StackStyled = styled(Stack)`
  & > :not(style) {
    margin: 0.5rem 0;
  }
`;

let FormSwitch = styled(FormControlLabel)`
  width: fit-content;
  align-self: end;
`;

const DiscountForm = ({ data, close }) => {
  const { updateDiscountCode, addDiscountCode } = discountStore();  // TODO FETCHING & ERROR

  const initialState = {
    title: '',
    desc: '',
    percentage: 0,
    active: true,
    announce: false
  };

  const [discount, setDiscount] = useState(data ?? initialState);

  const handleChange = ({ target }) => {
    setDiscount((prev) => {
      return { ...prev, [target.name]: ['active', 'announce'].includes(target.name) ? target.checked : target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (data) updateDiscountCode(discount['_id'], discount);
    else addDiscountCode(discount);
  }

  return (
    <AdminForm title={data ? "Edition" : "Nouveau code promo"} valid={handleClick} close={close}>
      <StackStyled>
        <TextField label="Code" name={'title'} size="small" value={discount['title']}
                   onChange={handleChange}/>
        <TextField label="Description" name={'desc'} size="small" multiline rows={3} value={discount['desc']}
                   onChange={handleChange}/>
      </StackStyled>
      <StackStyled>
        <TextField label="Réduction" name={'percentage'} value={discount['percentage']} onChange={handleChange}
                   size="small"
                   InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}/>

        <FormSwitch control={<Switch name={'active'} checked={discount['active']} onChange={handleChange}/>}
                    label="Actif" labelPlacement="start"/>
        <FormSwitch control={<Switch name={'announce'} checked={discount['announce']} onChange={handleChange}/>}
                    label="Accueil" labelPlacement="start"/>
      </StackStyled>
    </AdminForm>
  );
};

export default DiscountForm;