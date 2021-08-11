import React from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";


function ReservationItem({ reservation, onCancelReservation }) {
  const reservation_id = reservation.reservation_id;

  const handleCancel = async () => {
    // display confirm dialog and allow cancel
    const doesConfirm = window.confirm("Do you want to cancel this reservation?");
    // return early to exit out of function if not confirmed
    if (!doesConfirm) {
      return;
    }
    const res = await cancelReservation(reservation_id)
    onCancelReservation(res)
  }

  return (
    <tr>
      <td> {reservation.reservation_time}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.first_name}</td>
      <td> {reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
        {reservation.status === "seated" ? null :
          <Link
            to={`/reservations/${reservation_id}/seat`}
            className="btn btn-secondary mr-2 btn-sm"
            title="Seat"
          >
            Seat
          </Link>
        }
      </td>
      <td>
        <Link
          to={`/reservations/${reservation_id}/edit`}
          href={`/reservations/${reservation_id}/edit`}
          className="btn btn-secondary mr-2 btn-sm"
          title="Edit" >
          <span className="oi oi-pencil" />
        </Link>
      </td>
      <td>
        <button
          onClick={handleCancel}
          data-reservation-id-cancel={reservation.reservation_id}
          title="Cancel"
          className="btn btn-danger btn-sm">
          <span>Cancel</span>
        </button>
      </td>
    </tr>
  )
}

export default ReservationItem;