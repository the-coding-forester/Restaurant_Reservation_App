import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

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

  const seatButton = <>{
    reservation.status === "seated" ? null :
      <Link
        to={`/reservations/${reservation_id}/seat`}
        className="btn btn-secondary mr-lg-2 btn-sm"
        title="Seat"
      >
        <span className="d-none d-lg-block">Seat</span>
        <FontAwesomeIcon className="d-lg-none" icon={faChair}></FontAwesomeIcon>
      </Link>
  }</>;

  const editButton = <Link
    to={`/reservations/${reservation_id}/edit`}
    href={`/reservations/${reservation_id}/edit`}
    className="btn btn-secondary mr-lg-2 btn-sm"
    title="Edit" >
    <span className="oi oi-pencil" />
  </Link>;

  const cancelButton = <button
    onClick={handleCancel}
    data-reservation-id-cancel={reservation.reservation_id}
    title="Cancel"
    className="btn btn-danger btn-sm">
    <span className="d-none d-lg-block">Cancel</span>
    <span className="d-lg-none oi oi-trash"></span>
  </button>;

  const statusIcon = () => {
    switch (reservation.status) {
      case 'booked':
        return <span className="d-lg-none oi oi-book"></span>
      case 'seated':
        return <FontAwesomeIcon className="d-lg-none" icon={faChair}></FontAwesomeIcon>
      case 'finished':
        return <span className="d-lg-none oi oi-check"></span>
      case 'cancelled':
        return <span className="d-lg-none oi oi-trash"></span>
      default:
        return null;
    }
  }

  return (
    <tr>
      <td className="d-table-cell"> {reservation.reservation_time.slice(0, 5)}</td>
      <td className="d-table-cell" style={{ overflow: 'hidden' }}>{reservation.last_name}</td>
      <td className="d-none d-md-table-cell">
        {reservation.first_name}
      </td>
      <td className="d-table-cell"> {reservation.people}</td>
      <td className="d-table-cell" data-reservation-id-status={reservation.reservation_id}>
        <span className="d-none d-lg-block">{reservation.status}</span>
        <span>{statusIcon()}</span>
      </td>
      <td className="d-none d-lg-table-cell">
        {seatButton}
      </td>
      <td className="d-none d-lg-table-cell">
        {editButton}
      </td>
      <td className="d-none d-lg-table-cell">
        {cancelButton}
      </td>
      <td className="d-md-none btn-group-vertical" style={{ borderTop: 'none' }}>
        {seatButton}
        {editButton}
        {cancelButton}
      </td>
      <td className="d-none d-md-table-cell d-lg-none btn-group" style={{ borderTop: 'none' }}>
        {seatButton}
        {editButton}
        {cancelButton}
      </td>
    </tr>
  )
}

export default ReservationItem;