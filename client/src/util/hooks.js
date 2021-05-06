import React, { useState } from 'react'

export const useForm = (callback, initialState={}) => {
    const [values, setvalues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const onChange = (event) => {
      setvalues({ ...values, [event.target.name]: event.target.value });
    };
    const onSubmit = event => {
        event.preventDefault();
        callback();
    }
    
    return {
        onChange,
        onSubmit,
        values
    }
}