import React, { Component } from "react";
import {
  getallCottages,
  addNewCottage,
  removeSingleCottage,
  deleteCottageCategeory,
} from "../services/cottageService";
import { Link } from "react-router-dom";
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
    console.log(" toggleShowAddDialog: ");
    this.setState({
      showAddDialog: !this.state.showAddDialog,
    });
  }

  toggleShowEditDialog(idx) {
    console.log(" toggleShowEditDialog: ", idx);
    this.setState({
      showEditDialog: !this.state.showEditDialog,
      editItem: this.state.cottagesList[idx],
    });
  }
  /**
   *
   */
  updateCottageList = () => {
    getallCottages(localStorage.getItem("accessToken"))
      .then((srvrResp) => {
        console.log(srvrResp.allCottages);
        const { allCottages: cottagesList } = srvrResp;
        this.setState({ cottagesList });
      })
      .catch((err) => console.log(err));
  };

  /**
   *
   */
  componentDidMount = () => {
    this.updateCottageList();
  };

  /**
   *
   */
  getCottageTypes = () => {
    return this.state.cottagesList
      .map((ele) => ele.cottagetype)
      .filter((item, pos, sameArr) => sameArr.indexOf(item) == pos);
  };

  /**
   *
   * @param {*} id
   */
  deleteFullCottage = (id) => {
    console.log("deleteCottage", id);
    deleteCottageCategeory(id, localStorage.getItem("accessToken"))
      .then((deletedCottage) => {
        console.log(deletedCottage);
        if (deletedCottage) {
          this.updateCottageList();
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
        .then((deletedCottage) => {
          console.log(deletedCottage);
          if (deletedCottage) {
            this.updateCottageList();
          }
        })
        .catch((error) => console.log(error));
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
        console.log(addedCottage);
        if (addedCottage) {
          this.updateCottageList();
        }
      })
      .catch((error) => console.log(error));
  };

  /**
   *
   */
  render() {
    console.log(" CottageList -> render() ");
    console.log(this.state.cottagesList[1]);
    let cottageTable = this.state.cottagesList.map((ele, idx) => (
      <tr key={ele._id}>
        <td>{ele.cottagetype}</td>
        <td>{ele.costperday}</td>
        <td>
          <button onClick={() => this.decrementCottageCnt(ele._id)}>-</button>
          {ele.totalcottages.length}
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
              updateCottageList={() => this.updateCottageList()}
              cottageCategories={() => this.getCottageTypes()}
              closePopup={this.toggleShowAddDialog.bind(this)}
              // editInfo={this.state.editItem}
              // formType={this.state.formType}
            />
          ) : null}
          {this.state.showEditDialog ? (
            <EditCottage
              updateCottageList={() => this.updateCottageList()}
              cottageCategories={() => this.getCottageTypes()}
              closePopup={this.toggleShowEditDialog.bind(this)}
              editInfo={this.state.editItem}
              // formType={this.state.formType}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CottageList;
