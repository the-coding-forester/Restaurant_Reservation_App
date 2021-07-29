import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationItem from "./ReservationItem";

function ReservationList({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    listReservations({ date })
      .then((data) => setReservations(data))
      .catch(setReservationsError);
  }, [date])

  // const onCancelReservation = async (reservation) => {
  //   try {
  //     await cancelReservation(reservation.id);
  //     setReservations(reservations.filter((currentReservation) =>
  //       currentReservation.id !== reservation.id));
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div>
      <ul className="list-group my-2">
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </ul>
      <ErrorAlert error={reservationsError} />
    </div>
  )
}

export default ReservationList;