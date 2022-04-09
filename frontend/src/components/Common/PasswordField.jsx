import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const IconPassword = ({ onClick, show }) => {
  return (<InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      className={'show-password'}
      onClick={onClick}
      edge="end"
    >
      {show ? <VisibilityOff/> : <Visibility/>}
    </IconButton>
  </InputAdornment>);
}

const PasswordField = ({ label, name, value, onChange, error, helperText, fullwidth }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField label={label} name={name} value={value} onChange={onChange} error={error} helperText={helperText}
               type={showPassword ? 'text' : 'password'} fullwidth={fullwidth}
               InputProps={{
                 endAdornment: <IconPassword onClick={handleShowPassword} show={showPassword}/>
               }}/>
  );
};

export default PasswordField;