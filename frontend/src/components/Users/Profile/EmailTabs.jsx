import { Button, TextField } from "@mui/material";

import useForm from "../../../hooks/UseForm.jsx";
import ProfileForm from "./ProfileForm.jsx";

import userStore from "../../../store/userStore.js";
import { useState } from "react";

const EmailTabs = () => {
  const { userProfile, profileUpdate, isFetching } = userStore();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updateEmail = () => {
    profileUpdate({ '_id': userProfile['_id'], 'email': values['email'] })
      .then(() => {
        setSuccess('Enregistrement des modifications.');
        setValues({});
        return setError(null);
      })
      .catch(e => setError(e));
  }

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
  } = useForm(updateEmail, ['email']);

  return (
    <ProfileForm error={error} success={success}>
      <TextField label={'Email'} value={userProfile['email']} disabled fullWidth/>
      <TextField label={"Changer d'adresse mail ?"} name={'email'} value={values['email'] || ''} onChange={handleChange} fullWidth
             type={'email'} error={Boolean(errors['email'])} helperText={errors['email']}/>
      <Button variant="outlined" onClick={handleSubmit} disabled={isFetching}>Valider</Button>
    </ProfileForm>
  );
};

export default EmailTabs;