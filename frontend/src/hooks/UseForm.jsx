import { useState, useEffect } from 'react';

const useForm = (callback, validate, data) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(values).length === 0 && data) setValues(data)
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    console.log(errors)
  }, [values, errors, isSubmitting, callback, data]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
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