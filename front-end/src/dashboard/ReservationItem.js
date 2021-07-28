import React from "react";
import { Link } from "react-router-dom";

function ReservationItem({ reservation, onCancelReservation }) {
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
    <li key={`${reservation.id}`} className="list-group-item">
      <div className="d=flex justify-content-between">
        <div>
          <p> {reservation.reservation_time}</p>
        </div>
        <div>
          <p> {reservation.last_name}</p>
        </div>
        <div>
          <p> {reservation.first_name}</p>
        </div>
        <div>
          <p> {reservation.people}</p>
        </div>
        <div>
          <p> {reservation.status}</p>
        </div>
        <div>
          <p> {reservation.seat}</p>
        </div>
        <Link
          to={`/reservation/${reservation.id}/edit`}
          className="btn btn-secondary mr-2"
          title="Edit" >
          <span className="oi oi-pencil" />
        </Link>
        <div>
          <button onClick={handleCancel} className="btn btn-danger"><span className="oi oi-trash"></span></button>
        </div>
      </div>
    </li>
  )
}

export default ReservationItem;