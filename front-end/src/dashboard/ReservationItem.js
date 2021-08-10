import React from "react";
import { Link } from "react-router-dom";

function ReservationItem({ reservation, onCancelReservation }) {
  const reservation_id = reservation.reservation_id;

  const handleCancel = () => {
    // display confirm dialog and allow cancel
    const doesConfirm = window.confirm("Are you sure you want to cancel?");
    // return early to exit out of function if not confirmed
    if (!doesConfirm) {
      return;
    }
    onCancelReservation(reservation);
  }

  return (
    <tr>
      <td> {reservation.reservation_time}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.first_name}</td>
      <td> {reservation.people}</td>
      <td>{reservation.status}</td>
      <td>
        <Link
          to={`/reservations/${reservation_id}/seat`}
          className="btn btn-secondary mr-2 btn-sm"
          title="Seat"
        >
          Seat
        </Link>
      </td>
      <td>
        <Link
          to={`/reservations/${reservation.id}/edit`}
          className="btn btn-secondary mr-2 btn-sm"
          title="Edit" >
          <span className="oi oi-pencil" />
        </Link>
      </td>
      <td>
        <button onClick={handleCancel} className="btn btn-danger btn-sm"><span className="oi oi-trash"></span></button>
      </td>
    </tr>
  )
}

export default ReservationItem;