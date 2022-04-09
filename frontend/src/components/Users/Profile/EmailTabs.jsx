import { Button, TextField } from "@mui/material";

import useForm from "../../../hooks/UseForm.jsx";
import ProfileForm from "./ProfileForm.jsx";

import userStore from "../../../store/userStore.js";

const EmailTabs = () => {
  const { userProfile, profileUpdate, error, isFetching } = userStore();

  const updateEmail = async () => {
    await profileUpdate({ '_id': userProfile['_id'], 'email': values['email'] });
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(updateEmail, ['email']);

  return (
    <ProfileForm error={error}>
      <TextField label={'Email'} value={userProfile['email']} disabled fullWidth/>
      <TextField label={"Changer d'adresse mail ?"} name={'email'} value={values['email'] || ''} onChange={handleChange} fullWidth
             type={'email'} error={Boolean(errors['email'])} helperText={errors['email']}/>
      <Button variant="outlined" onClick={handleSubmit} disabled={isFetching}>Valider</Button>
    </ProfileForm>
  );
};

export default EmailTabs;