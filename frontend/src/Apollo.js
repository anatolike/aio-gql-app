import nodeFetch from "node-fetch";
import Cookies from "js-cookie";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import { onError } from "apollo-link-error";
import {ApolloLink} from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import {setContext} from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import {getGraphQLUrl} from "./utils/urls";


function _isServer() {
  return !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}


const invalidTokenLink = onError((error) => {
  if (error.networkError && error.networkError.statusCode === 401) {
    Cookies.remove("token")
  }
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");
  const jwt = token ? {Authorization: `JWT ${token}`} : {};
  return {
    headers: {
      ...headers,
      ...jwt
    }
  }
});

const linkOptions = {
  // credentials: "same-origin",
  // headers: {
  //   "X-CSRFToken": cookies.get("csrftoken")
  // },
  uri: getGraphQLUrl(),
  fetch: !_isServer() ? fetch : nodeFetch
};

const uploadLink = createUploadLink(linkOptions);

const batchLink = new BatchHttpLink(linkOptions);

const link = ApolloLink.split(
  operation => operation.getContext().useBatching,
  batchLink,
  uploadLink
);

export default new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: _isServer(),
  link: invalidTokenLink.concat(authLink.concat(link)),
  cache: process.browser
    ? new InMemoryCache().restore(window.__APOLLO_STATE__)
    : new InMemoryCache(),
})