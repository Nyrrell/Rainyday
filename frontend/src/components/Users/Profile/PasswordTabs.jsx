import { Button } from "@mui/material";

import PasswordField from "../../Common/PasswordField.jsx";
import useForm from "../../../hooks/UseForm.jsx";
import ProfileForm from "./ProfileForm.jsx";

import userStore from "../../../store/userStore.js";
import { useState } from "react";

const PasswordTabs = () => {
  const { userProfile, profileUpdate, isFetching } = userStore();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const updatePassword = () => {
    profileUpdate({
      '_id': userProfile['_id'],
      'password': values['newPassword'],
      'currentPassword': values['currentPassword']
    })
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
  } = useForm(updatePassword, ['newPassword']);


  return (
    <ProfileForm error={error} success={success}>
      <PasswordField label={'Mot de passe actuel'} name={'currentPassword'} value={values['currentPassword'] || ''}
                     fullWidth onChange={handleChange} error={Boolean(errors['currentPassword'])}
                     helperText={errors['currentPassword']}/>
      <PasswordField label={"Nouveau mot de passe"} name={'newPassword'} value={values['newPassword'] || ''} fullWidth
                     onChange={handleChange} error={Boolean(errors['newPassword'])} helperText={errors['newPassword']}/>
      <PasswordField label={"Confirmer mot de passe"} name={'newPasswordConfirm'} fullWidth onChange={handleChange}
                     value={values['newPasswordConfirm'] || ''} error={Boolean(errors['newPasswordConfirm'])}
                     helperText={errors['newPasswordConfirm']}/>
      <Button variant="outlined" onClick={handleSubmit} disabled={isFetching}>Valider</Button>
    </ProfileForm>
  );
};

export default PasswordTabs;