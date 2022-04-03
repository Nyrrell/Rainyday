import validator from 'validator';

const { isEmail, isStrongPassword, matches } = validator;

export const ValidateForm = (values) => {
  const errors = {};
  // USERNAME
  if (!values['username']) {
    errors['username'] = 'Username requis.';
  } else if (!matches(values['username'], /^[a-zA-Z0-9-_]{3,}$/)) {
    errors['username'] = 'Minimum 3 caractères.';
  }
  // EMAIL
  if (!values['email']) {
    errors['email'] = 'Adresse mail requise.';
  } else if (!isEmail(values['email'])) {
    errors['email'] = 'Adresse mail invalide.';
  }
  // PASSWORD
  if (!values['password']) {
    errors['password'] = 'Mot de passe requis.';
  } else if (isStrongPassword(values['password'])) {
    errors['password'] = 'Minimum 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre, 1 symbole.';
  }
  // CONFIRM PASSWORD
  if (values['password'] !== values['passwordConfirm']) {
    errors['passwordAreSame'] = 'Les mots de passe ne sont pas identique.';
  }

  return errors;
};