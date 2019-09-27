import React from "react";
import TextField from '@material-ui/core/TextField';
import ErrorMessage from "../ErrorMessage";

export default function FormField(props) {
  const {errors, children} = props;
  const hasErrors = errors && errors.length > 0;
  return (
    <TextField
      {...props}
      error={hasErrors}
      helperText={hasErrors ? <ErrorMessage errors={errors}/> : null}
    >
      {children}
    </TextField>
  )
}