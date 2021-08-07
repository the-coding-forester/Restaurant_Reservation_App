import React, { useEffect, useState } from "react";
import ErrorAlert from "../Errors/ErrorAlert";
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Last Name</th>
            <th scope="col">First Name</th>
            <th scope="col">Party Size</th>
            <th scope="col">Seat</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.reservation_id}
              reservation={reservation}
            />
          ))}
        </tbody>
      </table>
      <ErrorAlert error={reservationsError} />
    </div>
  )
}

export default ReservationList;