import React, { useState } from "react";
import { useHistory } from "react-router";
import Menu from "../layout/Menu";
import ReservationForm from "./ReservationsForm";


function NewReservationPage() {
  const history = useHistory

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservationDate, setReservationDate] = useState(`${currentDay}`);
  const [reservationTime, setReservationTime] = useState(`${currentTime}`)
  const [partySize, setPartySize] = useState(1);


  const handleCreateReservation = (event) => {
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setReservationDate(`${currentDay}`);
    setReservationTime(`${currentTime}`)
    setPartySize(1);
    history.push("/");
  }

  const handleCancelReservation = () => {
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setReservationDate(`${currentDay}`);
    setReservationTime(`${currentTime}`)
    setPartySize(1);
    history.push("/");
  }

  return (
    <div className="container">
      <Menu />

      <h1>New Reservations</h1>

      <ReservationForm
        firstName={firstName}
        lastName={lastName}
        mobileNumber={mobileNumber}
        reservationDate={reservationDate}
        reservationTime={reservationTime}
        partySize={partySize}
        onCancel={handleCancelReservation}
        onSubmit={handleCreateReservation}
      />

    </div>
  )
}

export default NewReservationPage;