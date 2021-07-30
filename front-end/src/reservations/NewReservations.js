import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../Errors/ErrorAlert";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationsForm";


function NewReservationPage() {
  let history = useHistory();
  const today = new Date();
  const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const currentTime = today.getHours() + ":" + today.getMinutes();

  const initialReservationState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: currentDay,
    reservation_time: currentTime,
    people: 1,
  };

  const [reservation, setReservation] = useState({ ...initialReservationState });
  const [reservationsErrors, setReservationErrors] = useState([]);


  const getFormErrors = () => {
    const resDate = new Date(reservation.reservation_date)
    const resDateAndTime = new Date(reservation.reservation_date + ' ' + reservation.reservation_time).getTime();
    const today = Date.now();

    const resErrors = [];

    // Check if date is on a Tuesday
    if (resDate.getUTCDay() === 2) {
      resErrors.push({ message: `Restaurant closed on Tuesdays` });
    }

    // Check if date is in the
    if (resDateAndTime < today) {
      resErrors.push({ message: `Reservation must be made for a time and date in the future` });
    }

    return resErrors;
  }

  const handleCreateReservation = async () => {
    try {
      const errors = getFormErrors();
      if (errors.length) {
        setReservationErrors(errors)
        return
      }

      await createReservation(reservation)
      setReservation({ ...initialReservationState })
      history.push("/");
    }
    catch (err) {
      setReservationErrors([err])
    }
  }

  const handleCancelReservation = async () => {
    setReservation({ ...initialReservationState })
    history.goBack();
  }

  return (
    <div className="NewReservation">

      <h1>New Reservations</h1>

      <ReservationForm
        reservation={reservation}
        onReservationChanged={setReservation}
        onCancel={handleCancelReservation}
        onSubmit={handleCreateReservation}
      />
      {reservationsErrors.map((error) => {
        return <ErrorAlert key={error} error={error} />;
      })}
    </div>
  )
}

export default NewReservationPage;