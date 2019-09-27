
import React from "react";
import {UserContext} from "./context";


export default class AuthProvider extends React.Component {

  componentDidMount() {
    const { verify } = this.props;
    verify();
  }

  render() {
    const { children, errors, user, loading, login, logout, register } = this.props;
    const isAuthenticated = !!user;
    return (
      <UserContext.Provider
        value={{ user, login, logout, register, errors: errors }}
      >
        {children({
          loading,
          isAuthenticated,
          user,
          errors,
        })}
      </UserContext.Provider>
    );
  }
}
