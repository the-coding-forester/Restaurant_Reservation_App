import React, { useEffect, useState } from "react";
import { cancelReservation, listReservations } from "../utils/api";
import ReservationItem from "./ReservationItem";

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    listReservations({})
      .then((data) => setReservations(data));
  }, [])

  const onCancelReservation = async (reservation) => {
    try {
      await cancelReservation(reservation.id);
      setReservations(reservations.filter((currentReservation) =>
        currentReservation.id !== reservation.id));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ul className="list-group my-2">
      {reservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          reservation={reservation}
          onCancelReservation={onCancelReservation}
        />
      ))}
    </ul>
  )
}

export default ReservationList;