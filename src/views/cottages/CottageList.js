import React, { Component } from "react";
import {
  getallCottages,
  addNewCottage,
  updateCottageInfo,
} from "../../services/cottageService";

import CottageCategory from "./CottageCategory";

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
   * @param {*} evt
   */
  updateCottageDetails = (cottagedetails) => {
    const {
      _id,
      cottagetype,
      cottageimages,
      costperday,
      description,
      totalcottages,
      facilities,
    } = cottagedetails;
    updateCottageInfo(
      _id,
      {
        cottagetype,
        cottageimages,
        costperday,
        facilities,
        description,
        totalcottages,
      },
      localStorage.getItem("accessToken")
    ).then((updatedCottage) => {
      if (updatedCottage) {
        console.log(
          " updated cottage infor from DB: ",
          updatedCottage.recordUpdated
        );
        this.setUpdatedCottage(updatedCottage.recordUpdated);
        // this.props.closePopup();
      }
    });
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
   */
  render() {
    const { cottagesList } = this.state;
    let allCottagesTbl = cottagesList.map((eachCottage, idx) => (
      <div>
        <CottageCategory
          cottagedetails={eachCottage}
          updateCottageDetails={this.updateCottageDetails}
          onImageUpload={this.onImageUpload}
        />
      </div>
    ));
    return (
      <div className="cottage-mgmt">
        <h2>Cottage Management</h2>
        {allCottagesTbl}
      </div>
    );
  }
}

export default CottageList;

/**
 *
 * @param {*} id   moced to cottageCategoery
 */
/**
  incrementCottageCnt = (id) => {
    console.log(" incrementCottageCnt: ", this.state);
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
 */

/**
 *  [ NOT IMPLEMENTED (time being) ]
 */
/**
  toggleShowAddDialog() {
    this.setState({
      showAddDialog: !this.state.showAddDialog,
    });
  }
 */

/**
 *  [ NOT IMPLEMENTED (time being) ]
 */
/**
  toggleShowEditDialog = (cottageId) => {
    console.log(" toggleShowEditDialog: ", this.state);

    this.setState({
      showEditDialog: !this.state.showEditDialog,
      editItem: this.state.cottagesList.find((ele) => ele._id === cottageId),
    });
  };
 */

/**
 *
 * @param {*} id [ NOT IMPLEMENTED (time being) ]
 */
/**
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
 */

/**
 *
 * @param {*} id  [ NOT IMPLEMENTED (time being) ]
 */
/**
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
 */

/**
 *
 * @param {*} newCottage   [ NOT IMPLEMENTED (time being) ]
 */
/**
  updateNewCottage = (newCottage) => {
    if (newCottage) {
      let { cottagesList } = this.state;
      cottagesList.push(newCottage);
      this.setState({ cottagesList });
    }
  };

 */
