import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ResortzyDate.css";

function ResortzyDate(props) {
  console.log(" ResortzyDate-> render()-> ", props);

  let minimunDate = new Date(props.minDate);
  let numberOfDaysToAdd = 6;
  minimunDate.setDate(minimunDate.getDate() + numberOfDaysToAdd);
  let maximunDate = new Date();
  numberOfDaysToAdd = 90; // for max. date
  maximunDate.setDate(maximunDate.getDate() + numberOfDaysToAdd);
  //
  return (
    <div>
      <DatePicker
        className="form-control"
        name={props.name}
        selected={new Date(props.initialDate)}
        value={new Date(props.initialDate)}
        onChange={(date) => props.setDateValue(date)}
        dateFormat="dd/MM/yyyy"
        minDate={minimunDate}
        maxDate={maximunDate}
        filterDate={(date) => date.getDay() !== 6 || date.getDay() !== 0}
        closeOnScroll={true}
        isClearable // to get a clear button
        placeholderText={props.initialDate}
      >
        <div style={{ color: "red" }}>Don't forget to check the weather! </div>
      </DatePicker>
    </div>
  );
}

export default ResortzyDate;
