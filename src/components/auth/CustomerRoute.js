import React from "react";
import { Route, Redirect } from "react-router-dom";

const CustomerRoute = ({
  component: Component,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated && user.userrole === "customer" ? (
          <Component {...props} user={user} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};

export default CustomerRoute;
