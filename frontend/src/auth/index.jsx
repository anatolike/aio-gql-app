import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import AuthProviderContainer from "./AuthProviderContainer";


const Auth = ({children}) => {
  return (
    <AuthProviderContainer>
      {({loading}) => {
        if (loading) {
          return <LinearProgress variant="query" />
        }
        return children;
      }}
    </AuthProviderContainer>
  )
};

export default Auth