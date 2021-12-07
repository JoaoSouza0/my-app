import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState({});

  function setError({ field, message }) {
    setErrors((prevState) => {
      prevState[field] = { field, message };
      return prevState;
    });
  }

  function removeError(field) {
    setErrors((prevState) => {
      delete prevState[field];
      return prevState;
    });
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors[fieldName]?.message;
  }

  return { setError, removeError, getErrorMessageByFieldName };
}
