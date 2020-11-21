import React from "react";
import "./ResortzyImage.css";

const ResortzyImage = (props) => {
  return (
    <div className="resortzy-img">
      {props.showClose && (
        <button
          className="image-del-btn btn-xs"
          onClick={() => {
            props.deleteImg();
            // props.closeEditDialog();
          }}
        >
          X
        </button>
      )}
      <img src={props.imglink} alt="" />
    </div>
  );
};

export default ResortzyImage;
