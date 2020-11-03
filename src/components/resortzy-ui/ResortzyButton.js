import React from "react";
import "./ResortzyButton.css";

const ResortzyButton = (props) => {
  let resClass = props.style;

  return (
    <div>
      <button className={resClass} onClick={props.clickapi}>
        {props.btntext}
      </button>
    </div>
  );
};

export default ResortzyButton;
