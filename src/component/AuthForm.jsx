import { useState } from "react";

const AuthForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, onChangeHandler, resetForm };
};

export default AuthForm;
