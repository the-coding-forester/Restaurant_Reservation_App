import ErrorAlert from "../Errors/ErrorAlert";
import ReservationItem from "./ReservationItem";

function ReservationList({ reservations, reservationsError, onCancelReservation }) {

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Last Name</th>
            <th scope="col">First Name</th>
            <th scope="col">Party Size</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.reservation_id}
              reservation={reservation}
              onCancelReservation={onCancelReservation}
            />
          ))}
        </tbody>
      </table>
      <ErrorAlert error={reservationsError} />
    </div>
  )
}

export default ReservationList;