import { Button } from "@mui/material";

import PasswordField from "../../Common/PasswordField.jsx";
import useForm from "../../../hooks/UseForm.jsx";
import ProfileForm from "./ProfileForm.jsx";

import userStore from "../../../store/userStore.js";

const PasswordTabs = () => {
  const { userProfile, profileUpdate, error, isFetching } = userStore();

  const updatePassword = async () => {
    await profileUpdate({
      '_id': userProfile['_id'],
      'password': values['newPassword'],
      'currentPassword': values['currentPassword']
    });
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(updatePassword, ['newPassword']);


  return (
    <ProfileForm error={error}>
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