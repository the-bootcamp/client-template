import React, { Component } from "react";
import AddCottage from "./AddCottage";
import { Link } from "react-router-dom";

class ListCottages extends Component {
  render() {
    return (
      <div>
        <AddCottage />
      </div>
    );
  }
}

export default ListCottages;
