import React from "react";
import { Route, Redirect } from "react-router-dom";

const ManagerRoute = ({
  component: Component,
  authenticated,
  user,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated && user.userrole === "manager" ? (
          <Component {...props} user={user} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};

export default ManagerRoute;
