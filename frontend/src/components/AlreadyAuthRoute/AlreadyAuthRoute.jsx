import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useUser from "../../auth/hooks";

const AlreadyAuthRoute = ({component: Component, ...rest}) => {
    const {user} = useUser();
    return (
        <Route
          {...rest}
          render={props => (
            user
              ? <Redirect to="/" />
              : <Component {...props} />
          )}
        />
    );
};

export default AlreadyAuthRoute;
