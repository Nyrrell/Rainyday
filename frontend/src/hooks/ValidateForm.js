import validator from 'validator';

const { isEmail, isStrongPassword, matches } = validator;

export const ValidateForm = (values, fields) => {
    const errors = {};

    // USERNAME
    if (fields.includes('username')) {
      if (!values['username']) {
        errors['username'] = 'Username requis.';
      } else if (!matches(values['username'], /^[a-zA-Z0-9-_]{3,}$/)) {
        errors['username'] = 'Minimum 3 caractères.';
      }
    }
    // EMAIL
    if (fields.includes('email')) {
      if (!values['email']) {
        errors['email'] = 'Adresse mail requise.';
      } else if (!isEmail(values['email'])) {
        errors['email'] = 'Adresse mail invalide.';
      }
    }
    // PASSWORD
    if (fields.includes('password')) {
      if (!values['password']) {
        errors['password'] = 'Mot de passe requis.';
      } else if (!isStrongPassword(values['password'])) {
        errors['password'] = 'Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre, 1 symbole.';
      }
    }
    // CONFIRM PASSWORD
    if (fields.includes('password') && fields.includes('passwordConfirm')) {
      if (values['password'] !== values['passwordConfirm']) {
        errors['passwordAreSame'] = 'Les mots de passe ne sont pas identique.';
      }
    }

    // NEW PASSWORD
    if (fields.includes('newPassword')) {
      if (!values['currentPassword'] || !values['newPassword'] || !values['newPasswordConfirm']) {
        if (!values['currentPassword']) errors['currentPassword'] = 'Ancien mot de passe requis.';
        if (!values['newPassword']) errors['newPassword'] = 'Nouveau mot de passe requis.';
      } else if (!isStrongPassword(values['newPassword'])) {
        errors['newPassword'] = 'Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre, 1 symbole.';
      }
      if (values['newPassword'] !== values['newPasswordConfirm']) {
        errors['newPasswordConfirm'] = 'Les mots de passe ne sont pas identique.';
      }
    }

    return errors;
  }
;