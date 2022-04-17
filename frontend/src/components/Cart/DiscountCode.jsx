import { Button, TextField } from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import { useState } from "react";
import discountStore from "../../store/discountStore.js";

const DiscountCode = () => {
  const { checkDiscountCode, discountCart, error } = discountStore();

  const [code, setCode] = useState(discountCart?.['code'] || '');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleClick = () => {
    if (!discountCart) {
      checkDiscountCode(code);
    } else {
      setCode('');
      discountStore.setState({ discountCart: null });
    }
  };

  return (
    <>
      <TextField label="Code promo" value={code} onChange={handleChange} variant="outlined" size={"small"} fullWidth
                 disabled={Boolean(discountCart)} helperText={error && "Code promo invalid"} error={error}/>
      <Button color={discountCart ? 'error' : 'primary'} size={'small'} variant={'outlined'} onClick={handleClick}
              sx={{ height: '40px'}}>
        {discountCart ? <Close/> : <Done/>}
      </Button>
    </>
  );
};

export default DiscountCode;