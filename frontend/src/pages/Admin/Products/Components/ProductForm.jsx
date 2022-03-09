import { Publish } from "@mui/icons-material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  Button,
  Switch,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  InputAdornment,
  FormControlLabel, MenuItem, Select, Stack,
} from "@mui/material";

import productStore from "../../../../store/productStore.js";

const Form = styled.form`
  flex: 2;
  padding: 0 1.5rem 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  flex: 0 0 100%;
  padding: 20px 0;
`;

const FormLeft = styled.div`
  & > :not(style) {
    margin: 0.5rem 0;
  }
`;

const FormRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 1rem;
`;

const Label = styled.label``;

const InputImage = styled.input`
  display: none;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  border: 1px slategray solid;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const BtnContainer = styled.div`
  flex: 0 0 100%;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ProductForm = ({ data, type, close }) => {
  const { updateProduct, addProduct, } = productStore(); // TODO FETCHING & ERROR

  const initialState = {
    title: '',
    desc: '',
    price: '',
    category: '',
    img: '',
    inStock: true,
    quantity: '',
    discount: ''
  };

  const [product, setProduct] = useState(data ?? initialState);
  const [images, setImages] = useState(data ?? initialState);

  useEffect(() => {
  }, [images])

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.name === 'inStock' ? e.target.checked : e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault(); // TODO IMAGE UPLOAD
    // if (images) setProduct(prev => ({ ...prev, img: images }))
    if (e.target.id === 'update') updateProduct(product);
    else addProduct(product);
  };

  const uploadImage = (e) => {
    setProduct(prev => ({ ...prev, img: URL.createObjectURL(e.target.files[0]) }));
    setImages(e.target.files[0]);
  };

  return (
    <Form>
      <Title>{data ? "Edition" : "Nouvel Article"}</Title>
      <FormLeft>
        <TextField fullWidth label="Nom" name={'title'} size="small" value={product['title']} onChange={handleChange}/>
        <TextField fullWidth label="Description" name={'desc'} size="small" multiline rows={3} value={product['desc']}
                   onChange={handleChange}/>
        <Stack direction="row" spacing={2}>
          {/*// TODO CATEGORIE DE LA DB */}
          <FormControl fullWidth size="small">
            <InputLabel>Catégorie</InputLabel>
            <Select
              name={'category'}
              defaultValue={product['category']}
              label="Catégorie"
              onChange={handleChange}
            >
              <MenuItem value={"sticker"}>Sticker</MenuItem>
              <MenuItem value={"affiche"}>Affiche</MenuItem>
              <MenuItem value={'drapeau'}>Drapeau</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Quantité" name={'quantity'} size="small" value={product['quantity']} onChange={handleChange}
                     type={'number'} fullWidth/>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField label="Prix" name={'price'} value={product['price']} onChange={handleChange} size="small"
                     InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }} fullWidth/>
          <TextField label="Réduction" name={'discount'} value={product['discount']} onChange={handleChange}
                     size="small"
                     InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} fullWidth/>
        </Stack>
        <FormControlLabel control={<Switch name={'inStock'} checked={product['inStock']} onChange={handleChange}/>}
                          label="Visible" labelPlacement="start"/>
      </FormLeft>

      <FormRight>
        <Img src={product['img']}/>
        <Label htmlFor="file">
          <InputImage accept="image/*" id="file" type="file" onChange={uploadImage}/>
          <IconButton aria-label="upload picture" name={'img'} component={'span'}>
            <Publish/>
          </IconButton>
        </Label>
      </FormRight>
      <BtnContainer>
        <Button variant={'contained'} color="info" onClick={handleClick} id={type}>Enregistrer</Button>
        <Button variant={'outlined'} color="error" onClick={close}>Annuler</Button>
      </BtnContainer>
    </Form>
  );
};

export default ProductForm;