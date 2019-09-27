import React from "react";


export const UserContext = React.createContext({
  user: undefined,
  login: undefined,
  logout: undefined,
  register: undefined,
  errors: {},
});
