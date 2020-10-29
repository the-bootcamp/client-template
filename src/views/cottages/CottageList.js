import React, { Component } from "react";
import {
  getallCottages,
  addNewCottage,
  removeSingleCottage,
  deleteCottageCategeory,
} from "../../services/cottageService";

import AddCottage from "./AddCottage";
import EditCottage from "./EditCottage";

class CottageList extends Component {
  state = {
    user: this.props.user,
    cottagesList: [],
    showAddDialog: false,
    showEditDialog: false,
    editItem: {},
  };

  /**
   *
   */
  toggleShowAddDialog() {
    this.setState({
      showAddDialog: !this.state.showAddDialog,
    });
  }

  toggleShowEditDialog(idx) {
    this.setState({
      showEditDialog: !this.state.showEditDialog,
      editItem: this.state.cottagesList[idx],
    });
  }

  /**
   *
   */
  componentDidMount = () => {
    getallCottages(localStorage.getItem("accessToken"))
      .then((srvrResp) => {
        const { allCottages: cottagesList } = srvrResp;
        this.setState({ cottagesList });
      })
      .catch((err) => console.log(err));
  };

  /**
   *
   */
  getCottageTypes = () => {
    return this.state.cottagesList
      .map((ele) => ele.cottagetype)
      .filter((item, pos, sameArr) => sameArr.indexOf(item) === pos);
  };

  /**
   *
   * @param {*} id
   */
  deleteFullCottage = (id) => {
    deleteCottageCategeory(id, localStorage.getItem("accessToken"))
      .then((deleteResponse) => {
        const { deletedCottage } = deleteResponse;
        if (deletedCottage) {
          let { cottagesList } = this.state;
          cottagesList = cottagesList.filter(
            (ele) => !(ele._id === deletedCottage._id)
          );
          this.setState({ cottagesList });
        }
      })
      .catch((error) => console.log(error));
  };

  /**
   *
   * @param {*} id
   */
  decrementCottageCnt = (id) => {
    let cottagetoEdit = this.state.cottagesList.find((ele) => ele._id === id);
    if (cottagetoEdit.totalcottages.length <= 1) {
      console.log(" ERROR  cannot decrement the number of cottages ...");
    } else {
      removeSingleCottage(id, localStorage.getItem("accessToken"))
        .then((deleteResponse) => {
          const { deletedRes } = deleteResponse;
          if (deletedRes) {
            let { cottagesList } = this.state;
            cottagesList = cottagesList.map((ele) =>
              ele._id === deletedRes._id ? deletedRes : ele
            );
            this.setState({ cottagesList });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  /**
   *
   * @param {*} updatedCottage
   */
  setUpdatedCottage = (updatedCottage) => {
    if (updatedCottage) {
      let { cottagesList } = this.state;
      cottagesList = cottagesList.map((ele) =>
        ele._id === updatedCottage._id ? updatedCottage : ele
      );
      this.setState({ cottagesList });
    }
  };

  /**
   *
   * @param {*} newCottage
   */
  updateNewCottage = (newCottage) => {
    if (newCottage) {
      let { cottagesList } = this.state;
      cottagesList.push(newCottage);
      this.setState({ cottagesList });
    }
  };
  /**
   *
   * @param {*} id
   */
  incrementCottageCnt = (id) => {
    let cottagetoEdit = this.state.cottagesList.find((ele) => ele._id === id);
    addNewCottage(cottagetoEdit, localStorage.getItem("accessToken"))
      .then((addedCottage) => {
        if (addedCottage) {
          let { cottagesList } = this.state;
          cottagesList = cottagesList.map((ele) =>
            ele._id === addedCottage.addRes._id ? addedCottage.addRes : ele
          );
          this.setState({ cottagesList });
        }
      })
      .catch((error) => console.log(error));
  };

  /**
   *
   */
  render() {
    console.log(" CottageList -> render() ", this.state);

    let cottageTable = this.state.cottagesList.map((ele, idx) => (
      <tr key={ele._id}>
        <td>{ele.cottagetype}</td>
        <td>{ele.costperday}</td>
        <td>
          <button onClick={() => this.decrementCottageCnt(ele._id)}>-</button>
          {ele.totalcottages.length}
        </td>
        <td>
          <button onClick={() => this.incrementCottageCnt(ele._id)}>+</button>
        </td>
        <td>
          <button onClick={() => this.toggleShowEditDialog(idx)}>Edit</button>
        </td>
        <td>
          <button onClick={() => this.deleteFullCottage(ele._id)}> Del </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h1>
          welcome{this.state.user.username} ,to the Resortzy manageent system.
        </h1>
        <h1> Cottages information </h1>
        <table className="table">
          <thead className="thead-light text-center">
            <tr>
              <th scope="col">Cottage categoery</th>
              <th scope="col">Price/day</th>
              <th scope="col"> Total Cottages </th>
              <th scope="col">Add</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{cottageTable}</tbody>
        </table>
        <div>
          <button onClick={() => this.toggleShowAddDialog()}>
            Add new Cottage
          </button>
          {/* <Link to="/manager/add-cottage"> New Cottage </Link> */}

          {this.state.showAddDialog ? (
            <AddCottage
              updateNewCottage={this.updateNewCottage}
              cottageCategories={() => this.getCottageTypes()}
              closePopup={this.toggleShowAddDialog.bind(this)}
            />
          ) : null}
          {this.state.showEditDialog ? (
            <EditCottage
              setUpdatedCottage={this.setUpdatedCottage}
              closePopup={this.toggleShowEditDialog.bind(this)}
              editInfo={this.state.editItem}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CottageList;
