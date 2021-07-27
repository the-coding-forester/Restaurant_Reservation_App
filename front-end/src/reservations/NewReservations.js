import React, { useState } from "react";
import { useHistory } from "react-router";
import Menu from "../layout/Menu";
import ReservationForm from "./ReservationsForm";


function NewReservationPage() {
  const history = useHistory;
  const today = new Date();
  const currentDay = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
  const currentTime = today.getHours() + ":" + today.getMinutes();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [reservation_date, setReservation_date] = useState(`${currentDay}`);
  const [reservation_time, setReservation_time] = useState(`${currentTime}`)
  const [people, setPeople] = useState(1);


  const handleCreateReservation = (event) => {
    event.preventDefault();
    setFirst_name("");
    setLast_name("");
    setMobile_number("");
    setReservation_date(`${currentDay}`);
    setReservation_time(`${currentTime}`)
    setPeople(1);
    history.push("/");
  }

  const handleCancelReservation = () => {
    setFirst_name("");
    setLast_name("");
    setMobile_number("");
    setReservation_date(`${currentDay}`);
    setReservation_time(`${currentTime}`)
    setPeople(1);
    history.goBack();
  }

  return (
    <div className="container">
      <Menu />

      <h1>New Reservations</h1>

      <ReservationForm
        first_name={first_name}
        last_name={last_name}
        mobile_number={mobile_number}
        reservation_date={reservation_date}
        reservation_time={reservation_time}
        people={people}
        onCancel={handleCancelReservation}
        onSubmit={handleCreateReservation}
      />

    </div>
  )
}

export default NewReservationPage;