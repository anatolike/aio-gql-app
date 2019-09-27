import App from "./App";
import React from "react";
import {StaticRouter} from "react-router-dom";
import express from "express";
import {renderToString} from "react-dom/server";
import client from "./Apollo";
import { ApolloProvider } from '@apollo/react-hooks';
import {getDataFromTree} from "react-apollo";
import JssProvider from "react-jss/lib/JssProvider";
import {SheetsRegistry} from "jss";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {createGenerateClassName} from "@material-ui/styles";
import theme from "./theme";


const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use((req, res) => {
    const context = {}
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    const Root = () => (
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.url}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </ApolloProvider>
    );
    try {
      getDataFromTree(<Root />).then(() => {
        const markup = renderToString(<Root />);
        const initialApolloState = client.extract();
        const css = sheetsRegistry.toString();
        if (context.url) {
          res.redirect(context.url)
        } else {
          res.status(200).send(
            `<!doctype html>
              <html lang="">
              <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>Welcome to App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                ${
                  assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                }
                ${
                  process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                }
                <style id="jss-server-side">${css}</style>
              </head>
              <body>
                <div id="root">${markup}</div>
                <script>
                  // TODO use serialize-javascript 
                  window.__APOLLO_STATE__ = ${JSON.stringify(initialApolloState).replace(/</g, '\\u003c')}
                </script>
              </body>
          </html>`
          );
          res.end()
        }
      })
    } catch (e) {
      console.error(e)
    }
  });

export default server
