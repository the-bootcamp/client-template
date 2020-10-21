import React, { Component } from "react";

class CustomerHome extends Component {
  state = {
    user: this.props.user,
  };

  render() {
    // console.log(" home-> render()-> ", this.state.user);
    return (
      <div>
        <h1>
          welcome {this.state.user.username} you are
          {this.state.user.userrole}
        </h1>
      </div>
    );
  }
}

export default CustomerHome;
