import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useUser from "../../../../auth/hooks";
import RegistrationForm from "../components/RegistrationForm";


const RegistrationView = () => {

  const {register, errors} = useUser();

  const handleOnSubmit = (formData) => {
    register(formData.first_name, formData.email, formData.password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <RegistrationForm
          onSubmit={handleOnSubmit}
          errors={errors}
        />
      </div>
    </Container>
  );

}

export default RegistrationView
