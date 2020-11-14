import React, { useEffect, useState } from "react";
import { getallCottages } from "../../services/cottageService";
import {
  changeBookingStatus,
  searchOpenBookings,
} from "../../services/bookingService";
import BookingsChekoutTable from "./BookingsChekoutTable";
import ResortzyAlert from "../../components/resortzy-ui/ResortzyAlert";
import ResortzyButton from "../../components/resortzy-ui/ResortzyButton";
import "./ManagerCheckout.css";
function ManagerCheckout() {
  const [categoryChosen, setCategoryChosen] = useState("");
  const [cottageNumchosen, setCottageNumchosen] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [arrayCottages, setArrayCottages] = useState([]);
  const [arrayRoomsNums, setArrayRoomsNums] = useState([]);
  const [bookingsForCheckout, setBookingsForCheckout] = useState([]);

  /**
   *
   */
  useEffect(() => {
    getallCottages(localStorage.getItem("accessToken")).then(
      (cottagesResponse) => {
        if (cottagesResponse) {
          const arrayCottages = cottagesResponse.allCottages;
          setArrayCottages(arrayCottages);
        }
      }
    );
  }, []);

  /* Form category drop box:   */
  let categoryDropbox = arrayCottages.map((ele, idx) => (
    <option key={idx} value={`${ele.cottagetype}`}>
      {ele.cottagetype}
    </option>
  ));

  let cottagenumbersDropbox = arrayRoomsNums.map((ele, idx) => (
    <option key={idx} value={`${ele}`}>
      {ele}
    </option>
  ));

  /**
   *
   * @param {*} event
   * @param {*} id
   */
  const changeBookingStatusState = (event, id) => {
    const bookingChanged = bookingsForCheckout.map((ele) =>
      ele._id === id ? { ...ele, bookingstatus: event.target.value } : ele
    );
    setBookingsForCheckout([...bookingChanged]);
  };

  /**
   *
   */
  const updateBookingStatus = (event, bookId) => {
    event.preventDefault();

    const newStatus = bookingsForCheckout
      .filter((ele) => ele._id === bookId)
      .map(({ bookingstatus }) => bookingstatus)[0];

    changeBookingStatus(bookId, newStatus, localStorage.getItem("accessToken"))
      .then((response) => {
        if (response.success) {
          let updatedBookingsForCheckout = [...bookingsForCheckout];
          updatedBookingsForCheckout = updatedBookingsForCheckout.filter(
            (booking) => booking._id !== response.updatedbooking._id
          );
          setBookingsForCheckout([...updatedBookingsForCheckout]);
        }
      })
      .catch((error) => setErrorMessage(error));
  };

  /*
   */
  const searchBookings = (evt) => {
    evt.preventDefault();
    if (!categoryChosen || !cottageNumchosen) {
      setErrorMessage("Choose Valid Cottage category and Cottage Number ");
      return;
    }
    searchOpenBookings(
      categoryChosen,
      cottageNumchosen,
      localStorage.getItem("accessToken")
    )
      .then((response) => {
        const { bookingsFound } = response;
        setBookingsForCheckout([...bookingsFound]);
      })
      .catch((error) => setErrorMessage(error));
  };

  /**
  rendering ---
  */
  return (
    <div>
      <div className="container-fluid">
        <form
          className="checkout-form"
          autoComplete="off"
          onSubmit={searchBookings}
        >
          {errorMessage !== "" && (
            <ResortzyAlert message={errorMessage} style={"danger"} />
          )}

          <div className="checkout-container p-3">
            <h3 className="text-center p-3"> Check-Out Management </h3>
            {/*  categeory row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">Choose cottage categeory :</label>
              <div className="col-md-5">
                <select
                  value={categoryChosen}
                  name="categoryChosen"
                  className="form-control"
                  onChange={(evt) => {
                    setCategoryChosen(evt.target.value);
                    setArrayRoomsNums(
                      arrayCottages
                        .filter(
                          (ele, idx) => ele.cottagetype === evt.target.value
                        )
                        .map((ele) => ele.totalcottages)[0]
                    );
                  }}
                >
                  <option value="">none</option>
                  {categoryDropbox}
                </select>
              </div>
              <div className="col-md-2"></div>
            </div>
            {/*  cottage number row */}
            <div className="form-group row">
              <div className="col-md-2"></div>
              <label className="col-md-3">Choose cottage categeory :</label>
              <div className="col-md-5">
                <select
                  value={cottageNumchosen}
                  name="cottageNumchosen"
                  className="form-control"
                  onChange={(evt) => setCottageNumchosen(evt.target.value)}
                >
                  <option value="">none</option>
                  {cottagenumbersDropbox}
                </select>
              </div>
              <div className="col-md-2"></div>
            </div>

            {/*  button submit */}
          </div>

          <div className="form-group row">
            <div className="col-md-5"></div>
            <ResortzyButton
              style="btn btn-primary  membership-btn"
              btntext={"Search Bookings"}
            />

            <div className="col-md-5"></div>
          </div>
        </form>
      </div>

      <BookingsChekoutTable
        openBookings={bookingsForCheckout}
        changeBookingStatusState={changeBookingStatusState}
        updateBookingStatus={updateBookingStatus}
      />
    </div>
  );
}

export default ManagerCheckout;
