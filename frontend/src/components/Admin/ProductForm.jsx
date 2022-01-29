import { Publish } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import {
  Button, FormControl,
  FormControlLabel, IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField
} from "@mui/material";

import { addProduct, updateProduct } from "../../reducers/apiCalls.js";

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

const ProductForm = ({ data, type }) => {
  const [inputs, setInputs] = useState(data ?? { title: '', desc: '', price: '', inStock: true, });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.name === 'inStock' ? e.target.checked : e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs, img: ' ' }; // TODO IMAGE
    if (e.target.id === 'update') updateProduct(inputs['_id'], product, dispatch);
    else addProduct(product, dispatch);
  }

  return (
    <Form>
      {data && <Title>Edition</Title>}
      <InputContainer>
        <FormLeft>
          <FormPanel>
            <TextField fullWidth label="Nom" name={'title'} size="small" margin="normal" value={inputs['title']}
                       onChange={handleChange}/>
            <TextField fullWidth label="Description" name={'desc'} size="small" margin="normal" multiline rows={3}
                       value={inputs['desc']} onChange={handleChange}/>
          </FormPanel>
          <FormPanel className={'groupRight'}>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>Prix</InputLabel>
              <OutlinedInput fullWidth label="Prix" id={'price'} name={'price'}
                             endAdornment={<InputAdornment position="end">€</InputAdornment>}
                             value={inputs['price']} onChange={handleChange}/>
            </FormControl>
            <FormControl fullWidth margin={'normal'}>
              <FormControlLabel control={<Switch name={'inStock'} checked={inputs['inStock']} onChange={handleChange}/>}
                                label="Disponible"
                                labelPlacement="start"/>
            </FormControl>
          </FormPanel>
        </FormLeft>

        <FormRight>
          <Img src={inputs['img']}/>
          <Label htmlFor="file">
            <InputImage accept="image/*" id="file" multiple type="file"/>
            <IconButton aria-label="upload picture" name={'img'} component={'span'}
                        onChange={(e) => setFile(e.target.files[0])}>
              <Publish/>
            </IconButton>
          </Label>
        </FormRight>
      </InputContainer>

      <Submit variant={'contained'} color="info" onClick={handleClick} id={type}>{ type }</Submit>
    </Form>
  );
};

export default ProductForm;