import Cookies from "js-cookie";
import React from "react";

const AUTH_TOKEN_KEY = "token";

export function getAuthToken() {
  return Cookies.get(AUTH_TOKEN_KEY)
}

export function removeAuthToken() {
  Cookies.remove(AUTH_TOKEN_KEY)
}

export function setAuthToken(token) {
  Cookies.set(AUTH_TOKEN_KEY, token)
}
