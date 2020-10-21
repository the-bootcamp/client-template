import React, { Component } from "react";
import {
  uploadCottagePictures,
  addNewCottage,
} from "../services/cottageService";
import "./AddCottage.css";

class AddCottage extends Component {
  state = {
    cottagetype: "",
    cottageimages: [],
    costperday: "",
    description: "",
    cottagestatus: "",
    showAddNext = false,
  };

  /**
   *
   * @param {*} e
   */
  onImageUpload = (e) => {
    uploadCottagePictures(
      e.target.files,
      localStorage.getItem("accessToken")
    ).then((cottageimages) => {
      console.log(cottageimages);
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
    addNewCottage(this.state, localStorage.getItem("accessToken")).then(
      (addedCottage) => {
        console.log(addedCottage);
        this.props.closePopup();
      }
    );
    console.log(this.state);
  };

  /**
   *
   * @param {*} evt
   */
  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  /**
   *
   */
  render() {
    console.log("AddCottage -> render(): ", this.state);
    const {
      cottagetype,
      cottageimages,
      costperday,
      description,
      cottagestatus,
    } = this.state;

    return (
      <div className="popup">
        <div>
          <button onClick={() => this.props.closePopup()}> X </button>
          <h2> Add a new Cottage </h2>
          {/*  Image for cottage */}
          <div className="categeory">
            <form></form>
          </div>
          <div className="add-rest-part">
             <div className="picture">
            <img
              src={cottageimages && cottageimages[0]}
              width="50"
              height="50"
            />
            <form>
              <input
                type="file"
                name="cottageimage"
                multiple
                onChange={this.onImageUpload}
              />
            </form>
            </div>
             <form onSubmit={this.addCottage}>
            {/*  Cottage Type:  */}
            <div className="form-group">
              <label>Choose cottage categeory : </label>
              <select
                value={cottagetype}
                name="cottagetype"
                className="form-control"
                onChange={this.handleChange}
              >
                <option value="standard">standard</option>
                <option value="classic">classic</option>
                <option value="superior">superior</option>
              </select>
            </div>
            {/* cost per day */}
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
            {/* Cottage description */}
            <label>Description: </label>
            <textarea
              name="description"
              type="text"
              value={description}
              onChange={this.handleChange}
              required={true}
            ></textarea>

            {/*  Cottage Status:  */}
            <div className="form-group">
              <label>Choose cottage status : </label>
              <select
                value={cottagestatus}
                name="cottagestatus"
                className="form-control"
                onChange={this.handleChange}
              >
                <option value="full">full</option>
                <option value="free">free</option>
                <option value="disable">disable</option>
              </select>
            </div>

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
