import { Switch, TextField, IconButton, FormControlLabel } from "@mui/material";
import { Publish } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import AdminForm from "../AdminForm.jsx";
import categoryStore from "../../../store/categoryStore.js";
import Image from "../../Common/Image.jsx";

const FormLeft = styled.div`
  flex: 1;
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

const Img = styled(Image)`
  width: 200px;
  height: 400px;
  border: 1px slategray solid;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const CategoryForm = ({ data, close }) => {
  const { updateCategory, addCategory, error, isFetching } = categoryStore();

  const initialState = {
    title: '',
    desc: '',
    img: '',
    visible: true
  };

  const [category, setCategory] = useState(data ?? initialState);
  const [images, setImages] = useState(null);

  useEffect(() => {
  }, [images])

  const handleChange = ({ target }) => {
    setCategory((prev) => {
      return { ...prev, [target.name]: target.name === 'visible' ? target.checked : target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let payload = category;
    if (images) {
      payload = new FormData();
      payload.append("images", images, category['title']);
      for (const categoryKey in category) {
        payload.append(categoryKey, category[categoryKey])
      }
    }
    if (data) updateCategory(category['_id'], payload);
    else addCategory(payload);
  };

  const uploadImage = (e) => {
    setCategory(prev => ({ ...prev, img: URL.createObjectURL(e.target.files[0]) }));
    setImages(e.target.files[0]);
  };

  const image = (images || !data) ? category['img'] : process.env.REACT_APP_BACKEND_URL + category['img'];

  return (
    <AdminForm title={data ? "Edition" : "Nouvelle catégorie"} valid={handleClick} close={close} error={error} fetching={isFetching}>
      <FormLeft>
        <TextField fullWidth label="Nom" name={'title'} size="small" value={category['title']} onChange={handleChange}/>
        <TextField fullWidth label="Description" name={'desc'} size="small" multiline rows={6} value={category['desc']}
                   onChange={handleChange}/>
        <FormControlLabel control={<Switch name={'visible'} checked={category['visible']} onChange={handleChange}/>}
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

export default CategoryForm;