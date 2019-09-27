import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import FormField from "../../../../../components/FormField";
import ErrorMessage from "../../../../../components/ErrorMessage";
import Form from "../../../../../components/Form";


function LoginForm({onSubmit, errors}) {
  return(
    <Form
      onSubmit={onSubmit}
      initial={{first_name: "", email: "", password: ""}}
      errors={errors}
    >
      {({data, change, errors, submit}) => {
        return (
          <div>
            <FormField
              margin="normal"
              required
              label="Email"
              id="email"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={change}
              errors={errors.email}
              fullWidth
            />
            <FormField
              margin="normal"
              required
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              id="password"
              style={{height: '32px'}}
              value={data.password}
              onChange={change}
              errors={errors.password}
              InputProps={{
                style: {height: '32px'}
              }}
            />
            <ErrorMessage errors={errors.__all__}/>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submit}
            >
              Авторизоватся
            </Button>
          </div>
        );
      }}
    </Form>
  )
}


LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};

export default LoginForm