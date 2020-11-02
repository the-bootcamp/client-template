import React, { Component } from "react";
import {
  uploadCottagePictures,
  addNewCottage,
  removeCottageImg,
} from "../../services/cottageService";

class AddCottage extends Component {
  state = {
    cottageRecId: this.props.editInfo ? this.props.editInfo._id : "",
    cottagetype: this.props.editInfo ? this.props.editInfo.cottagetype : "",
    cottageimages: this.props.editInfo ? this.props.editInfo.cottageimages : [],
    costperday: this.props.editInfo ? this.props.editInfo.costperday : "",
    description: this.props.editInfo ? this.props.editInfo.description : "",
    // cottagestatus: this.props.editInfo ? this.props.editInfo.cottagestatus : "",
    totalcottages: this.props.editInfo ? this.props.editInfo.totalcottages : [],
    showAddNext: false,
    errorMessage: "",
  };

  /**
   *
   * @param {*} e
   */
  onImageUpload = (e) => {
    if (e.target.files.length > 4) {
      this.setState({
        errorMessage: "One can upload a maz. of 4 images at instance",
      });
      return;
    }
    uploadCottagePictures(
      e.target.files,
      localStorage.getItem("accessToken")
    ).then((cottageimages) => {
      console.log(" images uploaded: ", cottageimages);
      this.setState({
        cottageimages,
      });
    });
  };

  /**
   *
   * @param {*} evt
   */
  addCottage = (evt) => {
    evt.preventDefault();
    removeCottageImg();
    // addNewCottage(this.state, localStorage.getItem("accessToken")).then(
    //   (addedCottage) => {
    //     this.props.updateNewCottage(addedCottage.addRes);
    //     this.props.closePopup();
    //   }
    // );
  };

  /**
   *
   * @param {*} evt
   */
  handleChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "cottagetype") {
      const existingTypes = this.props.cottageCategories();
      if (!existingTypes.includes(value)) {
        this.setState({ showAddNext: true });
      } else {
        this.setState({ showAddNext: false });
      }
    }
    this.setState({
      [name]: value,
    });
  };

  /**
   *
   */
  render() {
    console.log("AddCottage -> render(): ", this.props);
    const {
      cottagetype,
      cottageimages,
      costperday,
      description,
      // cottagestatus,
      // totalcottages,
      errorMessage,
    } = this.state;
    // let cottageTbl;

    return (
      <div className="popup">
        {errorMessage !== "" && errorMessage}
        <div>
          <button onClick={() => this.props.closePopup()}> X </button>
          <h2> Add a new Cottage </h2>
          <div className="add-rest-part">
            {/*  Image for cottage */}
            {this.state.showAddNext && (
              <div className="picture">
                <img
                  src={cottageimages && cottageimages[0]}
                  width="50"
                  height="50"
                  alt=""
                />
                <form autoComplete="off">
                  <input
                    type="file"
                    name="cottageimage"
                    multiple
                    onChange={this.onImageUpload}
                  />
                </form>
              </div>
            )}
            <form autoComplete="off" onSubmit={this.addCottage}>
              <div className="form-group">
                <label>Choose cottage categeory : </label>
                <select
                  value={cottagetype}
                  name="cottagetype"
                  className="form-control"
                  onChange={this.handleChange}
                >
                  <option value="">none</option>
                  <option value="standard">standard</option>
                  <option value="classic">classic</option>
                  <option value="superior">superior</option>
                </select>
              </div>
              {/* cost per day */}
              {this.state.showAddNext && (
                <div className="form-group">
                  <label>Cost per day: </label>
                  <input
                    className="form-control"
                    name="costperday"
                    value={costperday}
                    type="text"
                    required={true}
                    onChange={this.handleChange}
                  />
                </div>
              )}
              {/* Cottage description */}
              {this.state.showAddNext && (
                <div className="form-group">
                  <label>Description: </label>
                  <textarea
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.handleChange}
                    required={true}
                  ></textarea>
                </div>
              )}

              {/*  Cottage Status:  */}
              {/* {this.state.showAddNext && (
                <div className="form-group">
                  <label>Choose cottage status : </label>
                  <select
                    value={cottagestatus}
                    name="cottagestatus"
                    className="form-control"
                    onChange={this.handleChange}
                  >
                    <option value="">none</option>
                    <option value="full">full</option>
                    <option value="free">free</option>
                    <option value="disable">disable</option>
                  </select>
                </div>
              )} */}

              <button className="btn btn-primary  w-25 justify-content-center">
                Add Cottage
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCottage;
