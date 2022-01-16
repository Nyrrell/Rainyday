import styled from "styled-components";

import {
  Button, FormControl,
  FormControlLabel, IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField
} from "@mui/material";
import { Publish } from "@mui/icons-material";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  margin: 10px 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
`;

const FormLeft = styled.div`
  display: flex;

  & .groupRight {
    margin-left: 10px;
  }
`;

const FormPanel = styled.div``;

const FormRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 10%;
`;

const Label = styled.label``;

const InputImage = styled.input`
  display: none;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border: 1px slategray solid;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const Submit = styled(Button)`
  margin-top: 5%;
  align-self: flex-start;
`;

const ProductForm = ({ data }) => {
  return (
    <Form>
      { data && <Title>Edition</Title> }
      <InputContainer>
        <FormLeft>
          <FormPanel>
            <TextField fullWidth label="Nom" name={'name'} size="small" margin="normal" defaultValue={data?.['name']}/>
            <TextField fullWidth label="Description" name={'desc'} size="small" margin="normal" multiline rows={3}
                       defaultValue=""/>
            <TextField fullWidth label="Style" name={'style'} size="small" margin="normal"/>
          </FormPanel>
          <FormPanel className={'groupRight'}>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>Prix</InputLabel>
              <OutlinedInput fullWidth label="Prix" id={'price'} name={'price'}
                             endAdornment={<InputAdornment position="end">€</InputAdornment>}
                             defaultValue={data?.['price']}/>
            </FormControl>
            <TextField fullWidth label="Stock" name={'stock'} size="small" margin="normal"
                       defaultValue={data?.['stock']}/>
            <FormControl fullWidth margin={'normal'}>
              <FormControlLabel control={<Switch checked={data?.['status'] === 'active'}/>} label="Disponible"
                                labelPlacement="start"/>
            </FormControl>
          </FormPanel>
        </FormLeft>

        <FormRight>
          <Img src={data?.['img']}/>
          <Label htmlFor="file">
            <InputImage accept="image/*" id="file" multiple type="file"/>
            <IconButton aria-label="upload picture">
              <Publish/>
            </IconButton>
          </Label>
        </FormRight>
      </InputContainer>

      <Submit variant={'contained'} color="info">Update</Submit>
    </Form>
  );
};

export default ProductForm;