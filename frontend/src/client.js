import App from "./App";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {hydrate} from "react-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import client from "./Apollo";
import theme from "./theme";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {createGenerateClassName} from "@material-ui/styles";
import JssProvider from "react-jss/lib/JssProvider";

const generateClassName = createGenerateClassName();

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept()
}