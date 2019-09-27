import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useUser from "../../../../auth/hooks";
import RegistrationForm from "../components/LoginForm";


const LoginView = () => {
  const {login, errors} = useUser();

  const handleOnSubmit = (formData) => {
     login(formData.email, formData.password)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <RegistrationForm
          onSubmit={handleOnSubmit}
          errors={errors}
        />
      </div>
    </Container>
  );
}


export default LoginView
