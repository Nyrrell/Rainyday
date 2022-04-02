import { Publish } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Switch, TextField, InputLabel,
  IconButton, FormControl, InputAdornment,
  FormControlLabel, MenuItem, Select, Stack,
} from "@mui/material";

import AdminForm from "../AdminForm.jsx";
import Image from "../../Common/Image.jsx";

import productStore from "../../../store/productStore.js";

const FormLeft = styled.div`
  flex: 1;
  & > :not(style) {
    margin: 0.5rem 0;
  }
  
  & > div:last-of-type {
    padding-top: 0.5rem;
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

const Img = styled(Image)`
  width: 300px;
  height: 300px;
  border: 1px slategray solid;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductForm = ({ data, close, categories }) => {
  const { updateProduct, addProduct, error, isFetching } = productStore();

  const initialState = {
    title: '',
    desc: '',
    price: 1,
    category: '',
    img: '',
    inStock: true,
    quantity: 0,
    discount: 0
  };

  const [product, setProduct] = useState(data ?? initialState);
  const [images, setImages] = useState(null);

  useEffect(() => {
  }, [images])

  const handleChange = ({ target }) => {
    setProduct((prev) => {
      return { ...prev, [target.name]: target.name === 'inStock' ? target.checked : target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let payload = product;
    if (images) {
      payload = new FormData();
      payload.append("images", images, product['title']);
      for (const productKey in product) {
        payload.append(productKey, product[productKey])
      }
    }
    if (data) updateProduct(product['_id'], payload);
    else addProduct(payload);
  };

  const uploadImage = (e) => {
    setProduct(prev => ({ ...prev, img: URL.createObjectURL(e.target.files[0]) }));
    setImages(e.target.files[0]);
  };

  const image = (images || !data) ? product['img'] : process.env.REACT_APP_BACKEND_URL + product['img'];

  return (
    <AdminForm title={data ? "Edition" : "Nouvel Article"} valid={handleClick} close={close} error={error} fetching={isFetching}>
      <FormLeft>
        <TextField fullWidth label="Nom" name={'title'} size="small" value={product['title']} onChange={handleChange}/>
        <TextField fullWidth label="Description" name={'desc'} size="small" multiline rows={3} value={product['desc']}
                   onChange={handleChange}/>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Catégorie</InputLabel>
            <Select
              name={'category'}
              defaultValue={product['category']['_id'] || ''}
              label="Catégorie"
              onChange={handleChange}
            >
              {categories.map(c => <MenuItem key={c['_id']} value={c['_id']}>{c['title']}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Quantité" name={'quantity'} size="small" value={product['quantity']} onChange={handleChange}
                     type={'number'} fullWidth/>
        </Stack>
        <Stack direction={"row"} spacing={2}>
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
        <Img src={image}/>
        <Label htmlFor="file">
          <InputImage accept="image/*" id="file" type="file" onChange={uploadImage}/>
          <IconButton aria-label="upload picture" name={'img'} component={'span'}>
            <Publish/>
          </IconButton>
        </Label>
      </FormRight>
    </AdminForm>
  );
};

export default ProductForm;