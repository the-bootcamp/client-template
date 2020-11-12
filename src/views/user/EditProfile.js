import React, { useState, useEffect } from "react";
import { updateuser } from "../../services/userService";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

const EditProfile = (props) => {
  const [user, setUser] = useState(
    props.user ? { ...props.user, password: "" } : {}
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [edited, setEdited] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!edited) {
      setSuccessMessage("Profile is not changed ");
      return;
    }
    updateuser(user, localStorage.getItem("accessToken"))
      .then((editRes) => {
        if (editRes.success) {
          setUser({ ...editRes.userInfo, password: "" });
          setSuccessMessage(editRes.success);
        } else {
          setErrorMessage(editRes.errorMessage);
        }
      })
      .catch((error) => setErrorMessage(error));
  };

  return (
    <div className="auth-form  container-fluid">
      <form
        autoComplete="off"
        className="login-container"
        onSubmit={(evt) => handleUpdate(evt)}
      >
        {errorMessage !== "" && (
          <ResortzyAlert message={errorMessage} style={"danger"} />
        )}
        {successMessage !== "" && (
          <ResortzyAlert message={successMessage} style={"success"} />
        )}
        <div className="input-container p-3">
          <h3 className="text-center p-3"> Edit My Profile </h3>
          {/*  USERNAME row */}
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">
              Username <span className="mandatory-color"> * </span>
            </label>
            <div className="col-md-5">
              <input
                className="form-control"
                name="username"
                value={user.username}
                onChange={(evt) => {
                  setUser({ ...user, username: evt.target.value });
                  setEdited(true);
                }}
                required={true}
                type="text"
              />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/*  Email row */}
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">
              Email <span className="mandatory-color"> * </span>
            </label>
            <div className="col-md-5">
              <input
                className="form-control"
                name="email"
                value={user.email}
                onChange={(evt) => {
                  setUser({ ...user, email: evt.target.value });
                  setEdited(true);
                }}
                required={true}
                type="email"
              />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/*  password row */}
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">
              Password <span className="mandatory-color"> * </span>
            </label>
            <div className="col-md-5">
              <input
                className="form-control"
                name="password"
                type="password"
                value={user.password}
                onChange={(evt) => {
                  setUser({ ...user, password: evt.target.value });
                  setEdited(true);
                }}
              />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/*  Phone number:  */}
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">
              Phone <span className="mandatory-color"> * </span>
            </label>
            <div className="col-md-5">
              <input
                className="form-control"
                name="phone"
                type="phone"
                value={user.phone}
                onChange={(evt) => {
                  setUser({ ...user, phone: evt.target.value });
                  setEdited(true);
                }}
              />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/*  Phone number:  */}
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">
              Address <span className="mandatory-color"> * </span>
            </label>
            <div className="col-md-5">
              <textarea
                className="form-control"
                name="address"
                type="text"
                value={user.address}
                onChange={(evt) => {
                  setUser({ ...user, address: evt.target.value });
                  setEdited(true);
                }}
                required={true}
              ></textarea>
            </div>
            <div className="col-md-2"></div>
          </div>
          {/*  button  */}

          <div className="form-group row">
            <div className="col-md-5"></div>
            {/* <button type="submit" className="btn btn-primary col-md-2 m-3">Register</button> */}
            <ResortzyButton
              style="btn btn-primary  membership-btn"
              btntext={"Update Profile"}
            />
            <div className="col-md-5"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
