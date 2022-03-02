import validator from "validator";

const { isEmail, matches, isStrongPassword } = validator;
const userRegex = /^[a-zA-Z0-9-_]{3,}$/;

const validateEmail = (value) => {
  return isEmail(value);
};

const validateUsername = (value) => {
  return matches(value, userRegex);
};

const validatePassword = (value) => {
  return isStrongPassword(value);
}

export { validateEmail, validateUsername, validatePassword };