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
  const [reservationsError, setReservationError] = useState(null);

  const handleCreateReservation = async (reservation) => {
    try {
      await createReservation(reservation)
      setReservation({ ...initialReservationState })
      history.push("/");
    }
    catch (err) {
      setReservationError(err)
    }
  }

  const handleCancelReservation = async () => {
    setReservation({ ...initialReservationState })
    history.goBack();
  }

  return (
    <div className="container">

      <h1>New Reservations</h1>

      <ReservationForm
        reservation={reservation}
        onReservationChanged={setReservation}
        onCancel={handleCancelReservation}
        onSubmit={handleCreateReservation}
      />
      <ErrorAlert error={reservationsError} />
    </div>
  )
}

export default NewReservationPage;