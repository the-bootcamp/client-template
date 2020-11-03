import React from "react";
import { Route, Redirect } from "react-router-dom";

const AnonRoute = ({
  component: Component,
  authenticated,
  authenticate,
  ...rest
}) => {
  console.log(" entered  Anon rute ..... _");
  return (
    <Route
      render={(props) =>
        authenticated === false ? (
          <Component {...props} authenticate={authenticate} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};

export default AnonRoute;
