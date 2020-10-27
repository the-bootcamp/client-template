import React, { Component } from "react";
import {
  uploadCottagePictures,
  updateCottageInfo,
} from "../services/cottageService";
// import "./EditCottage.css";

class EditCottage extends Component {
  state = {
    cottageRecId: this.props.editInfo ? this.props.editInfo._id : "",
    cottagetype: this.props.editInfo ? this.props.editInfo.cottagetype : "",
    cottageimages: this.props.editInfo ? this.props.editInfo.cottageimages : [],
    costperday: this.props.editInfo ? this.props.editInfo.costperday : "",
    description: this.props.editInfo ? this.props.editInfo.description : "",
    cottagestatus: this.props.editInfo ? this.props.editInfo.cottagestatus : "",
    totalcottages: this.props.editInfo ? this.props.editInfo.totalcottages : [],
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
  updateCottage = (evt) => {
    evt.preventDefault();
    console.log(" Update cottage clicked ");
    const {
      cottageRecId: id,
      cottagetype,
      cottageimages,
      costperday,
      description,
      totalcottages,
    } = this.state;
    updateCottageInfo(
      id,
      { cottagetype, cottageimages, costperday, description, totalcottages },
      localStorage.getItem("accessToken")
    ).then((updatedCottage) => {
      if (updatedCottage) {
        this.props.updateCottageList();
        this.props.closePopup();
      }
    });
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

  changeCottageStatus = (evt, id) => {
    const { name, value } = evt.target;
    this.setState({
      totalcottages: this.state.totalcottages.map((el) =>
        el._id === id ? { ...el, cottagestatus: value } : el
      ),
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
    } = this.state;
    let cottageTbl;

    // form cottages table:
    // if (this.props.formType === "edit") {
    // cottageTbl = totalcottages.map(
    //   (ele) =>
    //     console.log(ele) || (
    //       <tr key={ele.cottagenumber}>
    //         <td> {ele.cottagenumber}</td>
    //         <td>
    //           <select
    //             value={ele.cottagestatus}
    //             name="cottagetype"
    //             className="form-control"
    //             onChange={(evt) => this.changeCottageStatus(evt, ele._id)}
    //           >
    //             <option value="">none</option>
    //             <option value="full">full</option>
    //             <option value="free">free</option>
    //             <option value="disable">disable</option>
    //           </select>
    //         </td>
    //       </tr>
    //     )
    // );
    // }

    return (
      <div className="popup">
        <div>
          <button onClick={() => this.props.closePopup()}> X </button>
          <h2> Edit the Cottage </h2>
          <div className="add-rest-part">
            {/*  Image for cottage */}

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

            <form autoComplete="off" onSubmit={this.updateCottage}>
              {/* <div className="form-group">
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
              </div> */}

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

              {/*  Cottage Status:  */}
              {/* <div className="form-group">
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
              </div> */}

              {/* <div className="form-group">
                  <table>
                    <tbody>{cottageTbl}</tbody>
                  </table>
                </div> */}

              <button className="btn btn-primary  w-25 justify-content-center">
                Update Cottage
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCottage;
