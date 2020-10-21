import React, { Component } from "react";
import ListCottages from "./ListCottages";
class ManagerHome extends Component {
  state = {
    user: this.props.user,
  };

  render() {
    return (
      <div>
        <h1>
          welcome Dear,{this.state.user.username} to the Resortzy manageent
          system.
        </h1>
        <ListCottages />
      </div>
    );
  }
}

export default ManagerHome;
