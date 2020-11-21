import React from "react";
import { Alert } from "react-bootstrap";

/* */
const ResortzyAlert = (props) => {
  const { style, message, closeAlert } = props;

  return (
    <Alert variant={style} dismissible>
      {message}
    </Alert>
  );
};

export default ResortzyAlert;
