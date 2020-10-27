import React from "react";
import { Route, Redirect } from "react-router-dom";

const CustomerRoute = ({
  component: Component,
  authenticated,
  user,
  ...rest
}) => {
  console.log(" customerroute: ", authenticated);
  console.log(" customerroute: ", user);
  console.log(" customerroute: ", Component);

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
