import { useState, useEffect } from 'react';

import { ValidateForm } from "./ValidateForm.js";

const useForm = (callback, fields) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    console.log(errors)
  }, [errors, isSubmitting, callback]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(ValidateForm(values, fields));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default useForm;