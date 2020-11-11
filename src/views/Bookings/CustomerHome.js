import React, { useState, useEffect } from "react";
import { searchAvailabilty } from "../../services/cottageService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Bookings.css";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";

const CustomerHome = (props) => {
  const [user, setUser] = useState(props.user);
  const [checkindate, setCheckindate] = useState("");
  const [checkoutdate, setCheckoutdate] = useState("");
  const [bookingdate, setBookingdate] = useState("");
  const [checkOutMinDate, setCheckOutMinDate] = useState(new Date());
  const [minimunDate, setMinimunDate] = useState(new Date());
  const [maximunDate, setMaximunDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let numberOfDaysToAdd = 6;
    let tempDate = minimunDate;
    tempDate.setDate(tempDate.getDate() + numberOfDaysToAdd);
    setMinimunDate(tempDate);
    numberOfDaysToAdd = 90;
    tempDate = maximunDate;
    tempDate.setDate(tempDate.getDate() + numberOfDaysToAdd);
    setMaximunDate(tempDate);
    setCheckOutMinDate(checkOutMinDate ? checkOutMinDate : minimunDate);
  }, []);

  const searchAvailability = (evt) => {
    evt.preventDefault();

    const {
      user: { cottagetype: defaultcottage },
    } = props;
    console.log(defaultcottage);
    searchAvailabilty(
      {
        checkindate,
        checkoutdate,
        defaultcottage,
      },
      localStorage.getItem("accessToken")
    ).then((searchRes) => {
      console.log(searchRes);
      if (searchRes && searchRes.cottagesAvailability) {
        props.setCottageSearchRes(searchRes.cottagesAvailability);
        props.history.push("/bookings");
      } else {
        console.log(" cottage not availbe ", searchRes.error);
        setErrorMessage(searchRes.error);
      }
    });
  };

  return (
    <div className="search-form container-fluid ">
      <form
        className="srch-container"
        autoComplete="off"
        onSubmit={searchAvailability}
      >
        <div className="input-container p-3">
          <h3 className="text-center p-3">Check Availability </h3>
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">Check-In: </label>
            <div className="col-md-5">
              <DatePicker
                className="form-control"
                selected={checkindate}
                name="checkindate"
                onChange={(date) => {
                  setCheckOutMinDate(date);
                  if (checkoutdate < date) setCheckoutdate(date);
                  setCheckindate(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={minimunDate}
                maxDate={maximunDate}
                filterDate={(date) =>
                  date.getDay() !== 6 || date.getDay() !== 0
                }
                closeOnScroll={true}
                isClearable
                placeholderText="Click to choose date ..."
              >
                <div style={{ color: "red" }}>
                  Don't forget to check the weather!
                </div>
              </DatePicker>
            </div>

            <div className="col-md-2"></div>
          </div>
          <div className="form-group row">
            <div className="col-md-2"></div>
            <label className="col-md-3">Check-Out: </label>
            <div className="col-md-5">
              <DatePicker
                className="form-control"
                name="checkoutdate"
                selected={checkoutdate}
                onChange={(date) => setCheckoutdate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={checkOutMinDate}
                maxDate={maximunDate}
                filterDate={(date) =>
                  date.getDay() !== 6 || date.getDay() !== 0
                }
                closeOnScroll={true}
                isClearable // to get a clear button
                placeholderText="Click to choose date ..."
              >
                <div style={{ color: "red" }}>
                  Don't forget to check the weather!{" "}
                </div>
              </DatePicker>
            </div>
            <div className="col-md-2"></div>
          </div>
          &nbsp;
          <div className="form-group row">
            <div className="col-md-5"></div>
            {/* <button type="submit" className="btn btn-primary col-md-2 m-3">Register</button> */}
            <ResortzyButton
              style="btn btn-primary  membership-btn"
              btntext={"Search"}
            />
            <div className="col-md-5"></div>
          </div>
          &nbsp;&nbsp;
          {errorMessage !== "" && (
            <ResortzyAlert message={errorMessage} style={"danger"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerHome;

// import React, { Component } from "react";
// import {
//   searchAvailabilty,
//   // getallCottages,
// } from "../../services/cottageService";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Bookings.css";

// class CustomerHome extends Component {
//   state = {
//     user: this.props.user,
//     checkindate: "",
//     checkoutdate: "",
//     bookingdate: "",
//     // cottageId: "",
//     checkOutMinDate: "",
//     errorMessage: "",
//   };

//   //temporary
//   // componentDidMount = () => {
//   // getallCottages(localStorage.getItem("accessToken"))
//   //   .then((cottagesList) => {
//   //     console.log(cottagesList.allCottages[0]._id);
//   //     // this.setState({ cottageId: cottagesList.allCottages[0]._id });
//   //   })
//   //   .catch((error) => console.log("Error in finding the cottages", error));
//   // };

//   searchAvailability = (evt) => {
//     evt.preventDefault();
//     let {
//       checkindate,
//       checkoutdate,
//       // cottageId,
//       user: { cottagetype: defaultcottage },
//     } = this.state;

//     // checkindate = checkindate.toLocaleDateString("de-DE");
//     // checkoutdate = checkoutdate.toLocaleDateString("de-DE");
//     console.log(defaultcottage);
//     searchAvailabilty(
//       {
//         checkindate,
//         checkoutdate,
//         defaultcottage,
//         // cottageId,
//       },
//       localStorage.getItem("accessToken")
//     ).then((searchRes) => {
//       console.log(searchRes);
//       if (searchRes && searchRes.cottagesAvailability) {
//         this.props.setCottageSearchRes(searchRes.cottagesAvailability);
//         this.props.history.push("/bookings");
//       } else {
//         console.log(" cottage not availbe ", searchRes.error);
//         this.setState({ errorMessage: searchRes.error });
//       }
//     });
//   };

//   /**
//    *
//    * @param {*} selectedDate
//    * @param {*} name
//    */
//   setSelectedDate = (selectedDate, name) => {
//     if (name === "checkindate") {
//       this.setState({ checkOutMinDate: selectedDate });
//       this.state.checkoutdate <= selectedDate
//         ? this.setState({ checkoutdate: selectedDate })
//         : console.log("");
//     }
//     this.setState({ [name]: selectedDate });
//   };

//   render() {
//     console.log(" CustomerHome-> render()-> ", this.state);
//     const { checkoutdate, checkindate, errorMessage } = this.state;
//     let { checkOutMinDate } = this.state;
//     let minimunDate = new Date();
//     let maximunDate = new Date();
//     let numberOfDaysToAdd = 6;
//     minimunDate.setDate(minimunDate.getDate() + numberOfDaysToAdd);
//     numberOfDaysToAdd = 90;
//     maximunDate.setDate(maximunDate.getDate() + numberOfDaysToAdd);
//     checkOutMinDate = checkOutMinDate ? checkOutMinDate : minimunDate;

//     return (
//       <div>
//         <h2>Check for cottage avaialbility </h2>
//         {errorMessage !== "" && errorMessage}
//         <div className="search-form-img">
//           <img
//             className="search-form-img"
//             src="/images/ResortCommon_1.jpg"
//             alt=""
//           />
//         </div>
//         <div className="container-fluid">
//           <form
//             className="form-inline search-form"
//             autoComplete="off"
//             onSubmit={this.searchAvailability}
//           >
//             <div className="form-group mb-2">
//               <label style={{ background: "white" }}>
//                 Search For Availability:
//               </label>
//             </div>

//             <div className="form-group mb-2">
//               {/*  className="form-group" */}
//               <label style={{ background: "white" }}>Check-in date : </label>
//               <DatePicker
//                 selected={checkindate}
//                 name="checkindate"
//                 onChange={(date) => this.setSelectedDate(date, "checkindate")}
//                 dateFormat="dd/MM/yyyy"
//                 minDate={minimunDate}
//                 maxDate={maximunDate}
//                 filterDate={(date) =>
//                   date.getDay() !== 6 || date.getDay() !== 0
//                 }
//                 closeOnScroll={true}
//                 isClearable // to get a clear button
//                 placeholderText="Click to choose date ..."
//               >
//                 <div style={{ color: "red" }}>
//                   Don't forget to check the weather!
//                 </div>
//               </DatePicker>
//             </div>
//             <div className="form-group mb-2">
//               <label style={{ background: "white" }}>Check-Out Date: </label>
//               <DatePicker
//                 name="checkoutdate"
//                 selected={checkoutdate}
//                 onChange={(date) => this.setSelectedDate(date, "checkoutdate")}
//                 dateFormat="dd/MM/yyyy"
//                 minDate={checkOutMinDate}
//                 maxDate={maximunDate}
//                 filterDate={(date) =>
//                   date.getDay() !== 6 || date.getDay() !== 0
//                 }
//                 closeOnScroll={true}
//                 isClearable // to get a clear button
//                 placeholderText="Click to choose date ..."
//               >
//                 <div style={{ color: "red" }}>
//                   Don't forget to check the weather!{" "}
//                 </div>
//               </DatePicker>
//             </div>
//             <button type="submit" className="btn btn-primary mb-2">
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default CustomerHome;
