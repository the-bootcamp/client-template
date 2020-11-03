import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component {...props} user={user} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
